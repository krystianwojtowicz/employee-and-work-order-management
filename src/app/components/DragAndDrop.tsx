import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { BigCalendar, localizer } from './BigCalendar';

const DnDCalendar = withDragAndDrop<any>(BigCalendar);

const resources = [
    { id: 1, title: 'Dr Graff' },
    { id: 2, title: 'Dr Alex' },
    { id: 3, title: 'Dr Michelle' },
];

const props = {
    max: moment('2023-10-28T16:00:00').toDate(),
    min: moment('2023-10-26T08:00:00').toDate(),
};

export const DragAndDrop = () => {
    return (
        <DnDCalendar localizer={localizer} resources={resources}></DnDCalendar>
    );
};
