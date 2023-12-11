import { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { RootState } from '../store/store';

export const Navbar = () => {
    const [nav, setNav] = useState(false);
    const email = useSelector((state: RootState) => state.users.email);
    const boss = useSelector((state: RootState) => state.users.boss);
    return (
        <div>
            <nav className='fixed left-0 right-0 top-0 z-10 w-full bg-black'>
                <div className='mx-auto justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-7xl'>
                    <div>
                        <div className='flex items-center justify-between py-3 md:block md:py-5'>
                            <h2 className='text-2xl font-bold text-cyan-600 '>
                                MyApp
                            </h2>
                            <div className='md:hidden'>
                                <button
                                    className='rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400'
                                    onClick={() => setNav(!nav)}
                                >
                                    {nav ? (
                                        <Image
                                            src={'/close.svg'}
                                            width={30}
                                            height={30}
                                            alt='logo'
                                        />
                                    ) : (
                                        <Image
                                            src={'/hamburger.svg'}
                                            width={30}
                                            height={30}
                                            alt='logo'
                                            className='focus:border-none active:border-none'
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
                                nav ? 'block p-12 md:p-0' : 'hidden'
                            }`}
                        >
                            <ul className='h-screen items-center justify-center md:flex md:h-auto '>
                                {/* {boss && ( */}
                                <li className='border-b-2 border-purple-900 py-4 pb-4 text-center text-xl uppercase text-white hover:bg-purple-900  md:border-b-0  md:px-6  md:hover:bg-transparent md:hover:text-purple-600'>
                                    <Link
                                        href='/tasks'
                                        onClick={() => setNav(!nav)}
                                    >
                                        tasks
                                    </Link>
                                </li>
                                {/* )} */}
                                {/* {email && (
                                    <> */}
                                <li className='border-b-2 border-purple-900 py-4 pb-4 text-center text-xl uppercase text-white hover:bg-purple-900  md:border-b-0  md:px-6  md:hover:bg-transparent md:hover:text-purple-600'>
                                    <Link
                                        href='/addtask'
                                        onClick={() => setNav(!nav)}
                                    >
                                        add task
                                    </Link>
                                </li>
                                <li className='border-b-2 border-purple-900 px-6 py-4 pb-4 text-center text-xl  uppercase text-white  hover:bg-purple-600  md:border-b-0  md:hover:bg-transparent md:hover:text-purple-600'>
                                    <Link
                                        href='/home'
                                        onClick={() => setNav(!nav)}
                                    >
                                        home
                                    </Link>
                                </li>
                                {/* </>
                                )} */}
                                <li className='border-b-2 border-purple-900 px-6 py-4 pb-4 text-center text-xl  uppercase text-white  hover:bg-purple-600  md:border-b-0  md:hover:bg-transparent md:hover:text-purple-600'>
                                    <Link
                                        href='/login'
                                        onClick={() => setNav(!nav)}
                                    >
                                        log in
                                    </Link>
                                </li>
                                <li className='border-b-2 border-purple-900 px-6 py-4 pb-4 text-center text-xl  uppercase text-white  hover:bg-purple-600  md:border-b-0  md:hover:bg-transparent md:hover:text-purple-600'>
                                    <Link
                                        href='signup'
                                        onClick={() => setNav(!nav)}
                                    >
                                        sign up
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
