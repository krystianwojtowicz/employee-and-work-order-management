'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setUserEmail } from '@/store/usersSlice';
import { getUser, signInWithEmail } from '../../api/users';
import { Person } from '../../helpers/enums';
import { Button } from '../components/Button';
import { FormWrapper } from '../components/FormWrapper';
import { TextInput } from '../components/TextInput';

interface FormValues {
    email: string;
    password: string;
}

export default function LogIn() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const [error, setError] = useState<string>('');
    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = async (data: FormValues): Promise<void> => {
        const { email, password } = data;

        try {
            const userData = await getUser(email);
            dispatch(setUserEmail(userData.emailOfYourBoss));

            await signInWithEmail(email, password);
            router.push('/addtask');
        } catch (error: any) {
            setError(error.message);
        }
    };
    return (
        <>
            <FormWrapper title='log in'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name={Person.EMAIL}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <TextInput
                                placeholder={'Type your e-mail'}
                                type={'text'}
                                label={'E-mail'}
                                register={register(Person.EMAIL)}
                            />
                        )}
                    />
                    {errors?.email && (
                        <span className='mt-[5px] text-xs text-red'>
                            This filed is required
                        </span>
                    )}
                    <Controller
                        name='password'
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <TextInput
                                placeholder={'Type your password'}
                                type={'text'}
                                label={'Password'}
                                register={register('password')}
                            />
                        )}
                    />
                    {errors?.password && (
                        <span className='mt-[5px] text-xs text-red'>
                            This filed is required
                        </span>
                    )}
                    <div className='flex justify-center'>
                        <Button type='submit' title='log in'></Button>
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
