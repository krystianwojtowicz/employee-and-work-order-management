interface IButton {
    title: string;
    handleClick?: () => void;
    type?: 'button' | 'submit';
}

export const Button = ({ title, handleClick, type }: IButton) => {
    return (
        <button
            className='mt-[20px] rounded-[5px] bg-greenLight p-[5px] text-white'
            onClick={handleClick}
            type={type}
        >
            {title}
        </button>
    );
};
