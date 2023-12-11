'use client';

import { Navbar } from '../components/Navbar';
import { ReduxProvider } from '../Providers';
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
