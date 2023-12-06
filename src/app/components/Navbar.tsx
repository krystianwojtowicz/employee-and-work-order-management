import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import hamburger from '../../assets/hamburger.png';

export const Navbar = () => {
    const [nav, setNav] = useState(false);
    return (
        // <div className='flex min-h-[80px] w-full justify-between bg-sky-400'>
        //     <label className='pl-[100px] text-3xl font-bold leading-[80px] text-white'>
        //         MyApp
        //     </label>
        //     <Image
        //         src={hamburger}
        //         alt='Logo'
        //         className='mr-[30px] mt-[30px] h-[20px] w-[20px] cursor-pointer fill-white sm:hidden'
        //         onClick={() => setNav((prev) => !prev)}
        //     />
        //     <ul className={`mr-[20px] ${!nav && 'hidden'} sm:block`}>
        //         <li className='mx-1 block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white sm:inline-block'>
        //             <Link
        //                 href='addtask'
        //                 onClick={() => setNav((prev) => !prev)}
        //             >
        //                 Add task
        //             </Link>
        //         </li>
        //         <li className='mx-1 inline-block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white'>
        //             <Link href='home' onClick={() => setNav((prev) => !prev)}>
        //                 Home
        //             </Link>
        //         </li>
        //         <li className='mx-1 inline-block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white'>
        //             <Link href='login' onClick={() => setNav((prev) => !prev)}>
        //                 Log in
        //             </Link>
        //         </li>
        //         <li className='mx-1 inline-block rounded px-[13px] text-[17px] uppercase leading-[80px] text-white'>
        //             <Link href='signup' onClick={() => setNav((prev) => !prev)}>
        //                 Sign up
        //             </Link>
        //         </li>
        //     </ul>
        // </div>
        <div>
            <nav className='fixed left-0 right-0 top-0 z-10 w-full bg-black'>
                <div className='mx-auto justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-7xl'>
                    <div>
                        <div className='flex items-center justify-between py-3 md:block md:py-5'>
                            <Link href='/'>
                                <h2 className='text-2xl font-bold text-cyan-600 '>
                                    LOGO
                                </h2>
                            </Link>
                            <div className='md:hidden'>
                                <button
                                    className='rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400'
                                    onClick={() => setNav(!nav)}
                                >
                                    {nav ? (
                                        <Image
                                            src={require('../../assets/hamburger.png')}
                                            // src={hamburger}
                                            width={30}
                                            height={30}
                                            alt='logo'
                                        />
                                    ) : (
                                        <Image
                                            src={require('../../assets/hamburger.png')}
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
                                <li className='border-b-2 border-purple-900 py-2 pb-6 text-center text-xl text-white hover:bg-purple-900  md:border-b-0  md:px-6  md:hover:bg-transparent md:hover:text-purple-600'>
                                    <Link
                                        href='addtask'
                                        onClick={() => setNav(!nav)}
                                    >
                                        add task
                                    </Link>
                                </li>
                                <li className='border-b-2 border-purple-900 px-6 py-2 pb-6 text-center  text-xl text-white  hover:bg-purple-600  md:border-b-0  md:hover:bg-transparent md:hover:text-purple-600'>
                                    <Link
                                        href='home'
                                        onClick={() => setNav(!nav)}
                                    >
                                        home
                                    </Link>
                                </li>
                                <li className='border-b-2 border-purple-900 px-6 py-2 pb-6 text-center  text-xl text-white  hover:bg-purple-600  md:border-b-0  md:hover:bg-transparent md:hover:text-purple-600'>
                                    <Link
                                        href='login'
                                        onClick={() => setNav(!nav)}
                                    >
                                        log in
                                    </Link>
                                </li>
                                <li className='border-b-2 border-purple-900 px-6 py-2 pb-6 text-center  text-xl text-white  hover:bg-purple-600  md:border-b-0  md:hover:bg-transparent md:hover:text-purple-600'>
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
