interface IButton {
    title: string;
    handleClick: () => void;
}

export const Button = ({ title, handleClick }: IButton) => {
    return (
        <button
            className='mt-[20px] rounded-[5px] bg-greenLight p-[5px] text-white'
            onClick={handleClick}
        >
            {title}
        </button>
    );
};
