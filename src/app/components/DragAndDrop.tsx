import { useEffect, useState } from 'react';
import {
    Calendar as BigCalendar,
    momentLocalizer,
    stringOrDate,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { formatDate } from '../../helpers/formatDate';
import { editEvent, EventItem, getEvents } from '../api/events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

export const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop<EventItem>(BigCalendar);

export const DragAndDrop = () => {
    const [events, setEvents] = useState<EventItem[]>([]);

    const onChangeEventItem = ({
        event,
        start,
        end,
    }: {
        event: EventItem;
        start: stringOrDate;
        end: stringOrDate;
    }) => {
        setEvents((prevEvents) =>
            prevEvents.map((prevEvent) =>
                prevEvent.id === event?.id
                    ? { ...event, start, end }
                    : prevEvent
            )
        );
        delete event.sourceResource;

        event.start = formatDate(start);
        event.end = formatDate(end);

        editEvent(event.id, event);
    };

    useEffect(() => {
        getEvents().then((data) => {
            if (data) setEvents(data);
        });
    }, []);
    return (
        <DnDCalendar
            events={events}
            localizer={localizer}
            onEventDrop={onChangeEventItem}
            className='m-4 sm:m-8 md:m-12 lg:m-16 xl:m-20 2xl:m-24'
            style={{ height: 500 }}
            views={['month', 'day', 'week']}
        ></DnDCalendar>
    );
};
