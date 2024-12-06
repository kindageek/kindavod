'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NavLinks from './nav/nav-links';
import NavDrawer from './nav/nav-drawer';
import useScrollPosition from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './nav/theme-toggle';
import { usePathname } from 'next/navigation';

const SearchInput = dynamic(() => import('../search/search-input'), {
  ssr: false,
});

export default function Navbar() {
  const pathname = usePathname();
  const { scrollPosition } = useScrollPosition();
  return (
    <nav
      className={cn('w-screen top-0 z-50 transition-default duration-500', {
        fixed: pathname === '/',
        sticky: pathname !== '/',
        'bg-[hsl(var(--background))]/50 shadow-lg backdrop-blur':
          scrollPosition > 0,
        'bg-gradient-to-b from-[hsl(var(--background))]/70 from-10%':
          scrollPosition === 0,
      })}
    >
      <div className='flex justify-between items-center gap-4 py-4 px-[4vw]'>
        <div className='flex items-center gap-10'>
          <Link
            href='/'
            className='flex flex-col !leading-none text-center text-foreground text-base md:text-xl'
          >
            <span>kinda</span>
            <span className='font-bold tracking-widest'>VOD</span>
          </Link>
          <div className='hidden md:flex'>
            <NavLinks />
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <SearchInput />
          <ThemeToggle />
          <div className='md:hidden flex items-center'>
            <NavDrawer />
          </div>
        </div>
      </div>
    </nav>
  );
}
