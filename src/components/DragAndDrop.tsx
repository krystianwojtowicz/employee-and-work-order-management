import { useEffect, useState } from 'react';
import {
    Calendar as BigCalendar,
    momentLocalizer,
    stringOrDate,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { editTask, getTasks, TaskItem } from '../api/tasks';
import { formatDate } from '../helpers/formatDate';
import { setTasksFromDB } from '../store/tasksSlice';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

export const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop<TaskItem>(BigCalendar);

export const DragAndDrop = () => {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const dispatch = useDispatch();

    const onChangeTaskItem = ({
        event,
        start,
        end,
    }: {
        event: TaskItem;
        start: stringOrDate;
        end: stringOrDate;
    }) => {
        setTasks((prevTasks) =>
            prevTasks.map((prevTask) =>
                prevTask.id === event?.id ? { ...event, start, end } : prevTask
            )
        );
        delete event.sourceResource;

        event.start = formatDate(start);
        event.end = formatDate(end);

        editTask(event.id, event);
    };

    useEffect(() => {
        getTasks().then((data) => {
            if (data) {
                setTasks(data);
                dispatch(setTasksFromDB(data));
            }
        });
    }, []);
    return (
        <DnDCalendar
            events={tasks}
            localizer={localizer}
            onEventDrop={onChangeTaskItem}
            className='m-4 sm:m-8 md:m-12 lg:m-16 xl:m-20 2xl:m-24'
            style={{ height: 500 }}
            views={['month', 'day', 'week']}
        ></DnDCalendar>
    );
};
