'use client';
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import format from 'date-fns/format';
// import getDay from 'date-fns/getDay';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

const locales = {
    pl: require('date-fns/locale/pl'),
};

// export const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales,
// });
export const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Big Meeting',
        allDay: true,
        start: new Date(2023, 10, 27),
        end: new Date(2023, 10, 27),
        isDraggable: true,
    },
    {
        title: 'Small Meeting',
        start: new Date(2023, 10, 27),
        end: new Date(2023, 10, 27),
        isDraggable: true,
    },
];

export const BigCalendar = () => {
    return (
        <main>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                style={{ height: 500, margin: '50px' }}
            ></Calendar>
        </main>
    );
};
