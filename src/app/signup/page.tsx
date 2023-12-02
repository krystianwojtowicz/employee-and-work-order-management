'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Person } from '../../helpers/enums';
import { createUser, signUpWithEmail } from '../api/users';
import { Button } from '../components/Button';
import { FormWrapper } from '../components/FormWrapper';
import { TextInput } from '../components/TextInput';

interface FormValues {
    name: string;
    lastName: string;
    position: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    id: string;
}

export default function SignUp() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            lastName: '',
            position: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
    });
    const password = watch('password');
    const passwordConfirmation = watch('passwordConfirmation');

    const [arePasswordsTheSame, setArePasswordsTheSame] =
        useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (arePasswordsTheSame) {
            handleSubmit(onSubmit)();
        }
    }, [arePasswordsTheSame]);

    const onSubmit = async (data: FormValues): Promise<void> => {
        const { email, password, passwordConfirmation, ...rest } = data;
        const dataWithoutPassword = { email, ...rest };
        try {
            const id = await signUpWithEmail(email, password).then(
                (id: string) => {
                    return id;
                }
            );
            createUser(dataWithoutPassword, id);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        const passwordsAreSame = password === passwordConfirmation;
        setArePasswordsTheSame(passwordsAreSame);
    };

    return (
        <>
            <FormWrapper title='sign up'>
                <form onSubmit={handleClick}>
                    <Controller
                        name={Person.NAME}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <TextInput
                                placeholder={'Type your name'}
                                type={'text'}
                                label={'Name'}
                                register={register(Person.NAME)}
                            />
                        )}
                    />
                    {errors?.name && (
                        <span className='mt-[5px] text-xs text-red'>
                            This filed is required
                        </span>
                    )}
                    <Controller
                        name={Person.LAST_NAME}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <TextInput
                                placeholder={'Type your last name'}
                                type={'text'}
                                label={'Last name'}
                                register={register(Person.LAST_NAME)}
                            />
                        )}
                    />
                    {errors?.lastName && (
                        <span className='mt-[5px] text-xs text-red'>
                            This filed is required
                        </span>
                    )}
                    <Controller
                        name={Person.POSITION}
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <TextInput
                                placeholder={'Type your position'}
                                type={'text'}
                                label={'Position'}
                                register={register(Person.POSITION)}
                            />
                        )}
                    />
                    {errors?.position && (
                        <span className='mt-[5px] text-xs text-red'>
                            This filed is required
                        </span>
                    )}
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
                                type={'password'}
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
                    <Controller
                        name='passwordConfirmation'
                        control={control}
                        defaultValue=''
                        rules={{ required: true }}
                        render={() => (
                            <TextInput
                                placeholder={'Confirm your password'}
                                type={'password'}
                                label={'Confirm password'}
                                register={register('passwordConfirmation')}
                            />
                        )}
                    />
                    {(errors?.passwordConfirmation ||
                        (submitted && !arePasswordsTheSame)) && (
                        <span className='mt-[5px] text-xs text-red'>
                            {errors?.passwordConfirmation
                                ? 'This field is required'
                                : 'Passwords are different'}
                        </span>
                    )}
                    <div className='flex justify-center'>
                        <Button type='submit' title='sign up'></Button>
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
