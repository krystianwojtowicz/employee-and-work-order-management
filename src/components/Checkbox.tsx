import React, { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
    EyeIcon,
    EyeSlashIcon,
    MarkDoneIcon,
    MarkIcon,
    SquareCheckIcon,
    SquareIcon,
} from '../assets/icons';

interface ICheckboxProps {
    variant: 'square' | 'eye' | 'mark';
    isChecked: boolean;
    styleLabel?: string;
    onCheckboxChange: (isChecked: boolean) => void;
    register?: UseFormRegisterReturn;
}

const EyeCheckBox = (checked: boolean) =>
    checked ? <EyeSlashIcon /> : <EyeIcon />;
const MarkCheckBox = (checked: boolean) =>
    checked ? <MarkDoneIcon /> : <MarkIcon />;
const DefaultCheckBox = (checked: boolean) =>
    checked ? <SquareCheckIcon /> : <SquareIcon />;
export const Checkbox = ({
    variant,
    isChecked,
    styleLabel,
    onCheckboxChange,
    register,
}: ICheckboxProps) => {
    const currentVariantCheckbox = (variant: string) =>
        variant && variant === 'square'
            ? DefaultCheckBox(isChecked)
            : variant === 'eye'
              ? EyeCheckBox(isChecked)
              : MarkCheckBox(isChecked);
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckedValue = e.target.checked;
        if (onCheckboxChange) onCheckboxChange(newCheckedValue);
    };
    return (
        <label
            className={`inline-flex cursor-pointer ${styleLabel} checkbox--${variant}`}
        >
            <input
                className={`clip-invisible absolute m-[-1px] h-[1px] w-[1px] overflow-hidden border-0 p-[0px]`}
                type='checkbox'
                checked={isChecked}
                name='Check'
                onChange={handleCheckboxChange}
                {...register}
            />
            {currentVariantCheckbox(variant)}
        </label>
    );
};
