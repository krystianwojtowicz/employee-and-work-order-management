'use client';

import { ReduxProvider } from '../Providers';
import { Navbar } from './components/Navbar';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <ReduxProvider>
                <body>
                    <Navbar />
                    {children}
                </body>
            </ReduxProvider>
        </html>
    );
}
