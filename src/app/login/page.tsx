'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Person } from '../../helpers/enums';
import { signInWithEmail } from '../api/users';
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

    const onSubmit = async (data: FormValues): Promise<void> => {
        const { email, password } = data;
        try {
            await signInWithEmail(email, password).then((id: string) => {
                return id;
            });
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