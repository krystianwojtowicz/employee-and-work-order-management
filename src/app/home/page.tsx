'use client';

// import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { DragAndDrop } from '../components/DragAndDrop';
import { Navbar } from '../components/Navbar';

export default function Home() {
    const pathname = usePathname();
    console.log(pathname);
    return (
        <>
            <Navbar />
            <DragAndDrop />
        </>
    );
}
