'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { Button } from '../../components/Button';

export default function Tasks() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const taskMaxLength = 40;
    const router = useRouter();
    return (
        <div className='mt-[80px] flex justify-center'>
            <main className='w-full max-w-screen-md p-4'>
                {tasks.map((task) => (
                    <div key={task.id}>
                        titile: {task.title}, description:{' '}
                        {task.description.length > taskMaxLength
                            ? `${task.description.slice(0, taskMaxLength)}...`
                            : task.description}
                        <div className='ml-[10px] inline-block'>
                            <Button
                                title='set dates'
                                handleClick={() =>
                                    router.push(`/tasks/${task.id}`)
                                }
                            />
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
