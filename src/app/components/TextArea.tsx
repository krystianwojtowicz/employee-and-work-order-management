import React, { TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ITextArea {
    placeholder: string;
    label: string;
    register?: UseFormRegisterReturn;
    rest?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const TextArea = ({
    placeholder,
    label,
    register,
    ...rest
}: ITextArea) => {
    return (
        <label className='block font-[Inter] text-[14px] font-[500] text-greenDark'>
            {label}
            <textarea
                className='box-border w-[100%] items-center rounded-[10px] border-[1px] border-solid border-greyDark bg-greyLight px-[20px] py-[12px] text-[14px] text-greenDark focus:outline focus:outline-[1px] focus:outline-greenLight'
                placeholder={placeholder}
                {...register}
                {...rest}
                rows={4}
            />
        </label>
    );
};
