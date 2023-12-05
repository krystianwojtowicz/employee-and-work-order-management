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
                className='mr-[30px] mt-[30px] h-[20px] w-[20px] fill-white sm:hidden'
                onChange={() => console.log('2')}
            />
            <ul className='mr-[20px] hidden sm:block'>
                <li className='mx-1 inline-block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white'>
                    <Link href='addtask'>Add task</Link>
                </li>
                <li className='mx-1 inline-block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white'>
                    <Link href='home'>Home</Link>
                </li>
                <li className='mx-1 inline-block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white'>
                    <Link href='login'>Log in</Link>
                </li>
                <li className='mx-1 inline-block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white'>
                    <Link href='signup'>Sign up</Link>
                </li>
            </ul>
        </div>
    );
};
