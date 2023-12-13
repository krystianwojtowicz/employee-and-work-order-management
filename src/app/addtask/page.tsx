'use client';

import { ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updateUserByEmail } from '@/api/users';
import { addTask, TaskItem } from '../../api/tasks';
import { handleSavePhoto } from '../../api/tasks';
import { Button } from '../../components/Button';
import { FormWrapper } from '../../components/FormWrapper';
import { TextArea } from '../../components/TextArea';
import { TextInput } from '../../components/TextInput';
import { Task } from '../../helpers/enums';
import type { RootState } from '../../store/store';

export default function AddTask() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TaskItem>({
        defaultValues: {
            title: '',
            description: '',
        },
    });
    const [error, setError] = useState<string>('');
    const [imgUpload, setImgUpload] = useState<File | null>(null);
    const emailOfBoss = useSelector(
        (state: RootState) => state.users.emailOfBoss
    );
    const emailOfTechnician = useSelector(
        (state: RootState) => state.users.emailOfTechnician
    );
    const notificationsOfBoss = useSelector(
        (state: RootState) => state.users.notificationsOfBoss
    );
    const router = useRouter();

    const onSubmit = async (data: TaskItem): Promise<void> => {
        try {
            data.isDraggable = true;
            data.end = '';
            data.start = '';
            data.emailOfBoss = emailOfBoss;
            data.emailOfTechnician = emailOfTechnician;

            const id = await addTask(data);

            handleSavePhoto(id, imgUpload);
            updateUserByEmail(emailOfBoss, data.title, notificationsOfBoss);
            router.push('/home');
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            setImgUpload(files[0]);
        }
    };
    return (
        <>
            <FormWrapper title='add task'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className='my-[10px]'
                        type='file'
                        onChange={handleChange}
                    />
                    <Controller
                        name={Task.NAME_OF_TASK}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <TextInput
                                placeholder={'Type name of task'}
                                label={'Title of task'}
                                type={'text'}
                                register={register(Task.NAME_OF_TASK)}
                            />
                        )}
                    />
                    {errors?.title && (
                        <span className='mt-[5px] text-xs text-red'>
                            This filed is required
                        </span>
                    )}
                    <Controller
                        name={Task.DESCRIPTION}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <TextArea
                                placeholder={'Type description'}
                                label={'Description'}
                                register={register(Task.DESCRIPTION)}
                            />
                        )}
                    />
                    {errors?.description && (
                        <span className='mt-[5px] text-xs text-red'>
                            This filed is required
                        </span>
                    )}
                    <div className='flex justify-center'>
                        <Button type='submit' title='add task'></Button>
                    </div>
                    {error && (
                        <span className='mt-[5px] flex w-full text-center text-xs text-red'>
                            {error}
                        </span>
                    )}
                </form>
            </FormWrapper>
        </>
    );
}
