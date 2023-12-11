import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Description } from '@/helpers/enums';
import { editTask, getTaskById, TaskItem } from '../api/tasks';
import { Button } from './Button';
import 'react-datepicker/dist/react-datepicker.css';

interface Dates {
    start: '';
    startHour: '';
    end: '';
    endHour: '';
}

export const Task = ({ taskId }: { taskId: string }) => {
    const [task, setTask] = useState<TaskItem | null>(null);
    const [error, setError] = useState<string>('');
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Dates>({
        defaultValues: {
            start: '',
            startHour: '',
            end: '',
            endHour: '',
        },
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const taskData = await getTaskById(taskId);
                if (taskData) {
                    setTask(taskData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [taskId]);

    const onSubmit = async (data: Dates): Promise<void> => {
        const { start, end, startHour, endHour } = data;
        try {
            if (task) {
                await editTask(task.id, {
                    start: `${start}T${startHour}:00`,
                    end: `${end}T${endHour}:00`,
                });
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    if (!task) {
        return <div className='mt-[80px]'>Loading task...</div>;
    }
    return (
        <div className='mt-[80px] flex justify-center'>
            <main className='w-full max-w-screen-md p-4'>
                <span>title: {task.title}</span>
                <span className='mt-[10px] block'>
                    description {task.description}
                </span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className='mt-[10px] block'>start date</label>
                    <Controller
                        name={Description.START}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <input
                                type='date'
                                {...register(Description.START)}
                            />
                        )}
                    />
                    {errors.start && (
                        <span className='block text-xs text-red'>
                            This field is required
                        </span>
                    )}
                    <label className='mt-[10px] block'>start hour</label>
                    <Controller
                        name={Description.START_HOUR}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <input
                                type='time'
                                {...register(Description.START_HOUR)}
                            />
                        )}
                    />
                    {errors.startHour && (
                        <span className='block text-xs text-red'>
                            This field is required
                        </span>
                    )}
                    <label className='mt-[10px] block'>end date</label>
                    <Controller
                        name={Description.END}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <input type='date' {...register(Description.END)} />
                        )}
                    />
                    {errors.end && (
                        <span className='block text-xs text-red'>
                            This field is required
                        </span>
                    )}
                    <label className='mt-[10px] block'>end hour</label>
                    <Controller
                        name={Description.END_HOUR}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <input
                                type='time'
                                {...register(Description.END_HOUR)}
                            />
                        )}
                    />
                    {errors.endHour && (
                        <span className='block text-xs text-red'>
                            This field is required
                        </span>
                    )}
                    <div className='flex justify-center'>
                        <Button type='submit' title='edit task'></Button>
                    </div>
                    <div className='flex justify-center'>
                        {error && (
                            <span className='mt-[5px] w-full text-center text-xs text-red'>
                                {error}
                            </span>
                        )}
                    </div>
                </form>
            </main>
        </div>
    );
};
