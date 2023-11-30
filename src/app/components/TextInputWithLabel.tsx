import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ITextInput {
    placeholder: string;
    type: 'text' | 'password';
    label: string;
    register?: UseFormRegisterReturn;
}

export const TextInputWithLabel = ({
    placeholder,
    type,
    register,
    label,
}: ITextInput) => {
    return (
        <label
            className={`mt-[10px] block font-[Inter] text-[14px] font-[500] text-greenDark`}
        >
            {label}
            <input
                className={
                    'box-border w-[100%] items-center rounded-[10px]  border-[1px] border-solid border-greyDark bg-greyLight px-[20px] py-[12px] text-[14px] text-greenDark focus:outline focus:outline-[1px] focus:outline-greenLight'
                }
                type={type}
                placeholder={placeholder}
                {...register}
            />
        </label>
    );
};
