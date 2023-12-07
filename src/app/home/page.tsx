'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { updateUserByEmail } from '@/api/users';
import { RootState } from '@/store/store';
import { DragAndDrop } from '../components/DragAndDrop';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const notifications = useSelector(
        (state: RootState) => state.users.notifications
    );
    const email = useSelector((state: RootState) => state.users.email);

    const notify = () => {
        notifications.map((notification) => toast(notification));
        updateUserByEmail(email);
    };

    useEffect(() => {
        if (notifications && notifications.length > 0) {
            notify();
        }
    }, []);
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
