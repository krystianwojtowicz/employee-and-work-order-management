import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getTaskById, TaskItem } from '../api/tasks';
import { Button } from './Button';
import 'react-datepicker/dist/react-datepicker.css';

export const Task = ({ taskId }: { taskId: string }) => {
    const router = useRouter();
    const [task, setTask] = useState<TaskItem | null>(null);

    // ToDo take task from redux
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

    if (!task) {
        return <div className='mt-[80px]'>Loading task...</div>;
    }
    return (
        <div className='mt-[80px] flex justify-center'>
            <main className='w-full max-w-screen-md p-4'>
                <span>title: {task.title}</span>
                <span className='mt-[10px] block'>
                    description: {task.description}
                </span>
                <span className='mt-[10px] block'>
                    start:{' '}
                    {task.start
                        ? `${task.start.slice(0, 10)} ${task.start.slice(11)}`
                        : ''}
                </span>
                <span className='my-[10px] block'>
                    end:{' '}
                    {task.end
                        ? `${task.end.slice(0, 10)} ${task.end.slice(11)}`
                        : ''}
                </span>
                {task.photoUrl && (
                    <Image
                        src={task.photoUrl}
                        alt='task'
                        width={300}
                        height={300}
                    />
                )}
                <div className='flex justify-center'>
                    <Button
                        title={'edit task'}
                        handleClick={() => router.push(`${task.id}/edit`)}
                    />
                </div>
            </main>
        </div>
    );
};
