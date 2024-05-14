import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/layout/navbar';
import { cx } from 'class-variance-authority';
import Footer from '@/components/layout/footer';

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
      <body
        className={cx(['flex flex-col h-full min-h-screen', inter.className])}
      >
        <Providers>
          <Navbar />
          <main className='flex-[1_1_100%] flex flex-col'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
