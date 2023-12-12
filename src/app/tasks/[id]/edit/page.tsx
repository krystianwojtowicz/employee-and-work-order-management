'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { editTask } from '../../../../api/tasks';
import { Button } from '../../../../components/Button';
import { Checkbox } from '../../../../components/Checkbox';
import { FormWrapper } from '../../../../components/FormWrapper';
import { Description } from '../../../../helpers/enums';
import { RootState } from '../../../../store/store';
import { TaskParam } from '../page';

interface IUpdateTask {
    start: string;
    startHour: string;
    end: string;
    endHour: string;
    done: boolean;
}

// ToDo add possibility of editing title, desc or even picture or pictures and even uploading many pics in addtask

/* musi robic end i start a jak zmieni task i tylko bos moze to robic to powiadamia technika, tyko bos moze edytowac, wylogowanie/zrobilem edit jako oddzielna strone */
export default function EditTask({ params }: TaskParam) {
    const task = useSelector((state: RootState) =>
        state.tasks.tasks.find((task) => task.id == params.id)
    );
    const boss = useSelector((state: RootState) => state.users.boss);
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IUpdateTask>({
        defaultValues: {
            start: '',
            startHour: '',
            end: '',
            endHour: '',
            done: false,
        },
    });

    const onSubmit = async (data: IUpdateTask): Promise<void> => {
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
    return (
        <>
            <FormWrapper title='edit task'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {boss && (
                        <>
                            <label className='mt-[10px] block font-[Inter] text-[16px] font-[500] text-greenDark'>
                                start date
                            </label>
                            <Controller
                                name={Description.START}
                                control={control}
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
                            <label className='mt-[10px] block font-[Inter] text-[16px] font-[500] text-greenDark'>
                                start hour
                            </label>
                            <Controller
                                name={Description.START_HOUR}
                                control={control}
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
                            <label className='mt-[10px] block font-[Inter] text-[16px] font-[500] text-greenDark'>
                                end date
                            </label>
                            <Controller
                                name={Description.END}
                                control={control}
                                rules={{ required: true }}
                                render={() => (
                                    <input
                                        type='date'
                                        {...register(Description.END)}
                                    />
                                )}
                            />
                            {errors.end && (
                                <span className='block text-xs text-red'>
                                    This field is required
                                </span>
                            )}
                            <label className='mt-[10px] block font-[Inter] text-[16px] font-[500] text-greenDark'>
                                end hour
                            </label>
                            <Controller
                                name={Description.END_HOUR}
                                control={control}
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
                        </>
                    )}
                    <span className='mt-[10px] block font-[Inter] text-[16px] font-[500] text-greenDark'>
                        Done
                    </span>
                    <Controller
                        name={Description.DONE}
                        control={control}
                        defaultValue={false}
                        render={() => (
                            <Checkbox
                                variant={'square'}
                                isChecked={boss}
                                onCheckboxChange={function (): void {
                                    throw new Error(
                                        'Function not implemented.'
                                    );
                                }}
                                register={register(Description.DONE)}
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
