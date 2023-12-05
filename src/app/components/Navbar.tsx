import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import hamburger from '../../assets/hamburger.png';

export const Navbar = () => {
    const [nav, setNav] = useState(false);
    return (
        <div className='flex min-h-[80px] w-full justify-between bg-sky-400'>
            <label className='pl-[100px] text-3xl font-bold leading-[80px] text-white'>
                MyApp
            </label>
            <Image
                src={hamburger}
                alt='Logo'
                className='mr-[30px] mt-[30px] h-[20px] w-[20px] cursor-pointer fill-white sm:hidden'
                onClick={() => setNav((prev) => !prev)}
            />
            <ul className={`mr-[20px] ${!nav && 'hidden'} sm:block`}>
                <li className='mx-1 block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white sm:inline-block'>
                    <Link
                        href='addtask'
                        onClick={() => setNav((prev) => !prev)}
                    >
                        Add task
                    </Link>
                </li>
                <li className='mx-1 inline-block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white'>
                    <Link href='home' onClick={() => setNav((prev) => !prev)}>
                        Home
                    </Link>
                </li>
                <li className='mx-1 inline-block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white'>
                    <Link href='login' onClick={() => setNav((prev) => !prev)}>
                        Log in
                    </Link>
                </li>
                <li className='mx-1 inline-block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white'>
                    <Link href='signup' onClick={() => setNav((prev) => !prev)}>
                        Sign up
                    </Link>
                </li>
            </ul>
        </div>
    );
};
