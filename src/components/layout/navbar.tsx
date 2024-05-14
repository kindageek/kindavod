'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/movies', label: 'Movies' },
  { href: '/tv', label: 'TV Shows', disabled: true },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className='w-full flex justify-between items-center gap-4 sticky top-0 py-4'>
      <div className='flex items-center gap-4'>
        <Link
          href='/'
          className='flex flex-col leading-none text-center text-xl'
        >
          <span>kinda</span>
          <span className='font-bold tracking-widest'>VOD</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {NAV_LINKS.map(({ href, label, disabled = false }) => (
              <NavigationMenuItem key={href}>
                <Link
                  href={href}
                  legacyBehavior
                  passHref
                  tabIndex={disabled ? -1 : undefined}
                >
                  <NavigationMenuLink
                    active={pathname === href}
                    className={cn(buttonVariants({ variant: 'link' }), {
                      underline:
                        (pathname === href && href === '/') ||
                        (pathname.startsWith(href) && href !== '/'),
                      'pointer-events-none opacity-50': disabled,
                    })}
                  >
                    {label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
