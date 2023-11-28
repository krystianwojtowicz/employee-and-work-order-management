import { useEffect, useState } from 'react';
import {
    Calendar as BigCalendar,
    momentLocalizer,
    stringOrDate,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import { firestore } from '../api/firebase';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

export const localizer = momentLocalizer(moment);

const exampleEvents = [
    {
        title: 'Big Meeting',
        start: new Date('2023-11-28T09:00:00'),
        end: new Date('2023-11-28T10:00:00'),
        id: '1',
        isDraggable: true,
    },
];

type EventItem = {
    start: Date | string;
    end: Date | string;
    id: string;
    title: string;
    isDraggable: boolean;
};

const DnDCalendar = withDragAndDrop<EventItem>(BigCalendar);

export const DragAndDrop = () => {
    const [events, setEvents] = useState<EventItem[]>(exampleEvents);

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
    };

    const eventsCollectionRef = collection(firestore, 'events');

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await getDocs(eventsCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                console.log(filteredData);
            } catch (err) {
                console.error(err);
            }
        };
        getEvents();
    }, []);
    return (
        <DnDCalendar
            events={events}
            localizer={localizer}
            onEventDrop={onChangeEventItem}
            style={{ height: 500, margin: '50px' }}
        ></DnDCalendar>
    );
};
