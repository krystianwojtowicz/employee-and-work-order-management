import { useEffect } from 'react';
import {
    Calendar as BigCalendar,
    momentLocalizer,
    stringOrDate,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { editTask, getTasks, TaskItem } from '../api/tasks';
import { formatDate } from '../helpers/formatDate';
import type { RootState } from '../store/store';
import { setTasksFromDB } from '../store/tasksSlice';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

export const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop<TaskItem>(BigCalendar);

export const DragAndDrop = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const boss = useSelector((state: RootState) => state.users.boss);
    const tasksToEdit = tasks
        .map((task) => structuredClone(task))
        .filter((task) => !task.done);
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
        delete event.sourceResource;

        event.start = formatDate(start);
        event.end = formatDate(end);

        editTask(event.id, event);
    };

    useEffect(() => {
        getTasks().then((data: any) => {
            if (data) {
                dispatch(setTasksFromDB(data));
            }
        });
    }, []);
    return (
        <DnDCalendar
            events={tasksToEdit}
            localizer={localizer}
            onEventDrop={boss ? onChangeTaskItem : undefined}
            className='m-4 sm:m-8 md:m-12 lg:m-16 xl:m-20 2xl:m-24'
            style={{ height: 500 }}
            views={['month', 'day', 'week']}
        ></DnDCalendar>
    );
};
