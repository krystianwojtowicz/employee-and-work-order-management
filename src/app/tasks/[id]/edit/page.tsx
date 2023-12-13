'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getUser, updateUserByEmail } from '@/api/users';
// import { TextInput } from '@/components/TextInput';
import { editTask } from '../../../../api/tasks';
import { Button } from '../../../../components/Button';
import { Checkbox } from '../../../../components/Checkbox';
import { FormWrapper } from '../../../../components/FormWrapper';
import { Task } from '../../../../helpers/enums';
import { RootState } from '../../../../store/store';
import { TaskParam } from '../page';

interface IUpdateTask {
    start: string;
    startHour: string;
    end: string;
    endHour: string;
    done: boolean;
    // emailOfTechnician: string;
}

// ToDo add possibility of editing title, desc or even picture or pictures and even uploading many pics in addtask
/*  wylogowanie/ */
export default function EditTask({ params }: TaskParam) {
    const router = useRouter();
    const [notificationsOfTechnician, setNotificationsOfTechnician] = useState<
        string[] | undefined
    >(undefined);
    const task = useSelector((state: RootState) =>
        state.tasks.tasks.find((task) => task.id == params.id)
    );
    const boss = useSelector((state: RootState) => state.users.boss);
    const emailOfTechnician = useSelector(
        (state: RootState) => state.users.emailOfTechnician
    );
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<IUpdateTask>({
        defaultValues: {
            start: '',
            startHour: '',
            end: '',
            endHour: '',
            done: false,
            // emailOfTechnician: '',
        },
    });
    const done = watch('done');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Wywołanie funkcji getUser
                const technicianData = await getUser(emailOfTechnician);
                const { notifications } = technicianData;
                setNotificationsOfTechnician(notifications);
            } catch (error) {
                console.error(
                    'Błąd podczas pobierania danych o użytkowniku',
                    error
                );
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data: IUpdateTask): Promise<void> => {
        const { start, end, startHour, endHour } = data;
        const dataToUpdate = boss
            ? {
                  start: `${start}T${startHour}:00`,
                  end: `${end}T${endHour}:00`,
                  done,
              }
            : {
                  done,
              };
        try {
            if (task) {
                await editTask(task.id, dataToUpdate);
                if (boss) {
                    await updateUserByEmail(
                        emailOfTechnician,
                        task.title,
                        notificationsOfTechnician
                    );
                }
                router.push('/tasks');
            }
        } catch (error: any) {
            setError(error.message);
        }
    };
    return (
        <>
            <FormWrapper title='edit task'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {boss && (
                        <>
                            <label className='mt-[10px] block font-[Inter] text-[14px] font-[500] text-greenDark'>
                                start date
                            </label>
                            <Controller
                                name={Task.START}
                                control={control}
                                rules={{ required: true }}
                                render={() => (
                                    <input
                                        type='date'
                                        {...register(Task.START)}
                                    />
                                )}
                            />
                            {errors.start && (
                                <span className='block text-xs text-red'>
                                    This field is required
                                </span>
                            )}
                            <label className='mt-[10px] block font-[Inter] text-[14px] font-[500] text-greenDark'>
                                start hour
                            </label>
                            <Controller
                                name={Task.START_HOUR}
                                control={control}
                                rules={{ required: true }}
                                render={() => (
                                    <input
                                        type='time'
                                        {...register(Task.START_HOUR)}
                                    />
                                )}
                            />
                            {errors.startHour && (
                                <span className='block text-xs text-red'>
                                    This field is required
                                </span>
                            )}
                            <label className='mt-[10px] block font-[Inter] text-[14px] font-[500] text-greenDark'>
                                end date
                            </label>
                            <Controller
                                name={Task.END}
                                control={control}
                                rules={{ required: true }}
                                render={() => (
                                    <input
                                        type='date'
                                        {...register(Task.END)}
                                    />
                                )}
                            />
                            {errors.end && (
                                <span className='block text-xs text-red'>
                                    This field is required
                                </span>
                            )}
                            <label className='mt-[10px] block font-[Inter] text-[14px] font-[500] text-greenDark'>
                                end hour
                            </label>
                            <Controller
                                name={Task.END_HOUR}
                                control={control}
                                rules={{ required: true }}
                                render={() => (
                                    <input
                                        type='time'
                                        {...register(Task.END_HOUR)}
                                    />
                                )}
                            />
                            {errors.endHour && (
                                <span className='block text-xs text-red'>
                                    This field is required
                                </span>
                            )}
                            {/* <Controller
                                name={Task.EMAIL_OF_TECHNICIAN}
                                control={control}
                                rules={{ required: true }}
                                render={() => (
                                    <TextInput
                                        placeholder={
                                            'Type e-mail of technician'
                                        }
                                        type={'text'}
                                        label={'E-mail of your technician'}
                                        register={register(
                                            Task.EMAIL_OF_TECHNICIAN
                                        )}
                                    />
                                )}
                            />
                            {errors?.emailOfTechnician && (
                                <span className='mt-[5px] text-xs text-red'>
                                    This filed is required
                                </span>
                            )} */}
                        </>
                    )}
                    <span className='mt-[10px] block font-[Inter] text-[14px] font-[500] text-greenDark'>
                        Done
                    </span>
                    <Controller
                        name={Task.DONE}
                        control={control}
                        defaultValue={false}
                        render={() => (
                            <Checkbox
                                variant={'square'}
                                isChecked={done}
                                onCheckboxChange={function (): void {
                                    throw new Error(
                                        'Function not implemented.'
                                    );
                                }}
                                register={register(Task.DONE)}
                            />
                        )}
                    />
                    <div className='flex justify-center'>
                        <Button type='submit' title='edit task' />
                    </div>
                    <div className='flex justify-center'>
                        {error && (
                            <span className='mt-[5px] w-full text-center text-xs text-red'>
                                {error}
                            </span>
                        )}
                    </div>
                </form>
            </FormWrapper>
        </>
    );
}
