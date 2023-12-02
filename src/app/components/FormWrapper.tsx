export const FormWrapper = ({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) => {
    return (
        <main className='m-auto mt-[50px] w-[300px]'>
            <h1 className='text-center text-2xl font-bold'>{title}</h1>
            {children}
        </main>
    );
};
