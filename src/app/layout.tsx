import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/layout/navbar';
import { cx } from 'class-variance-authority';
import Footer from '@/components/layout/footer';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KindaVOD',
  description: 'Video on Demand by @kindadev',
  twitter: {
    title: 'KindaVOD',
    description: 'Video on Demand by @kindadev',
  },
  openGraph: {
    title: 'KindaVOD',
    description: 'Video on Demand by @kindadev',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cx(['flex flex-col h-full min-h-dvh', inter.className])}>
        <Providers>
          <Navbar />
          <main className='flex-[1_1_100%] flex flex-col'>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
