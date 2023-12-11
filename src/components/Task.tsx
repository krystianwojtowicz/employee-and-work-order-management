import { useEffect, useState } from 'react';
// import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { Description } from '@/helpers/enums';
import { getTaskById, TaskItem } from '../api/tasks';
// import { Button } from '../components/Button';
import { Button } from './Button';
import 'react-datepicker/dist/react-datepicker.css';

export const Task = ({ taskId }: { taskId: string }) => {
    const [task, setTask] = useState<TaskItem | null>(null);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Partial<TaskItem>>({
        defaultValues: {
            start: '',
        },
    });
    // const {
    //     handleSubmit,
    //     control,
    //     errors,
    //     // formState: { isSubmitting },
    //     register,
    //     watch
    //   } = useForm({
    //     mode: "onChanges",
    //     reValidateMode: "onChange"
    //   });
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

    const onSubmit = async (data: Partial<TaskItem>): Promise<void> => {
        console.log(data);
        console.log('2');
    };

    if (!task) {
        return <div className='mt-[80px]'>Loading task...</div>;
    }
    return (
        <div className='mt-[80px]'>
            {/* <span className='block'>title: {task.title}</span>
            <span className='block'>description: {task.description}</span>
            <input type='date'></input>
            <input type='time'></input> */}
            <form onSubmit={handleSubmit(onSubmit)}></form>
            <input type='date' {...register(Description.START)}></input>
            <div className='flex justify-center'>
                <Button type='submit' title='add task'></Button>
            </div>
            {errors[Description.START] && (
                <span>{errors[Description.START].message}</span>
            )}
            {/* <Controller
                        name={Description.START}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={({field}) => (
                            <input type='date' 
                            // register={register(Description.NAME_OF_TASK)}
                                {...field}
                                />
                            // </input>
                            // <TextInput
                            //     placeholder={'Type name of task'}
                            //     label={'Title of task'}
                            //     type={'text'}
                            //     register={register(Description.NAME_OF_TASK)}
                            // />
                        )}
                    /> */}
        </div>
    );
};
