'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Person } from '../../helpers/enums';
import { signInWithEmail } from '../api/users';
import { Button } from '../components/Button';
import { TextInputWithLabel } from '../components/TextInputWithLabel';

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
        console.log(data);
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
            <main className='m-auto mt-[50px] w-[300px]'>
                <h1 className='text-center'>log in</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name={Person.EMAIL}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <TextInputWithLabel
                                placeholder={'Type your e-mail'}
                                type={'text'}
                                label={'E-mail'}
                                register={register(Person.EMAIL)}
                            />
                        )}
                    />
                    <Controller
                        name='password'
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <TextInputWithLabel
                                placeholder={'Type your password'}
                                type={'text'}
                                label={'Password'}
                                register={register('password')}
                            />
                        )}
                    />
                    <div className='flex justify-center'>
                        <Button type='submit' title='log in'></Button>
                        {error && (
                            <span className='mt-[5px] text-xs text-red'>
                                {error}
                            </span>
                        )}
                    </div>
                </form>
            </main>
        </>
    );
}
