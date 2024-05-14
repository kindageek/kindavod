import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/layout/navbar';
import { cx } from 'class-variance-authority';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KindaVOD',
  description: 'Video on Demand by @kindadev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={cx(['container flex flex-col', inter.className])}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
