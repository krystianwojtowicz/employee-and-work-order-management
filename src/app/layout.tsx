import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReduxProvider } from '../Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Order Management',
    description: 'Order management system',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <ReduxProvider>
                <body className={inter.className}>{children}</body>
            </ReduxProvider>
        </html>
    );
}
