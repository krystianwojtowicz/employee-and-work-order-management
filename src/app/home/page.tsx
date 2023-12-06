'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { RootState } from '@/store/store';
import { DragAndDrop } from '../components/DragAndDrop';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const notifications = useSelector(
        (state: RootState) => state.users.notifications
    );

    const notify = () => {
        notifications.map((notification) => toast(notification));
    };

    useEffect(() => {
        if (notifications.length > 0) {
            notify();
        }
    });
    return (
        <div className='mt-[100px]'>
            <DragAndDrop />
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </div>
    );
}
