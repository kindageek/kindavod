'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NavLinks from './nav/nav-links';
import NavDrawer from './nav/nav-drawer';

const SearchInput = dynamic(() => import('../search/search-input'), {
  ssr: false,
});

export default function Navbar() {
  return (
    <div className='w-screen sticky top-0 z-10 bg-[hsl(var(--background))]/50 shadow-lg'>
      <div className='container flex justify-between items-center gap-4 py-4'>
        <div className='flex items-center gap-4'>
          <Link
            href='/'
            className='flex flex-col leading-none text-center text-xl'
          >
            <span>kinda</span>
            <span className='font-bold tracking-widest'>VOD</span>
          </Link>
          <div className='hidden md:flex'>
            <NavLinks />
          </div>
        </div>
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <div className='md:hidden'>
          <NavDrawer />
        </div>
      </div>
    </div>
  );
}
