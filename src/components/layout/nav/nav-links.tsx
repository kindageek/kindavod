'use client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { buttonVariants } from '../../ui/button';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const NAV_LINKS: {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}[] = [
  { href: '/', label: 'Home' },
  {
    href: '/movies',
    label: 'Movies',
    children: [
      { href: '/movies?tab=popular', label: 'Popular' },
      { href: '/movies?tab=top_rated', label: 'Top Rated' },
      { href: '/movies?tab=now_playing', label: 'Now Playing' },
      { href: '/movies?tab=upcoming', label: 'Upcoming' },
    ],
  },
  {
    href: '/tv',
    label: 'TV Shows',
    children: [
      { href: '/tv?tab=popular', label: 'Popular' },
      { href: '/tv?tab=top_rated', label: 'Top Rated' },
      { href: '/tv?tab=on_the_air', label: 'On The Air' },
      { href: '/tv?tab=airing_today', label: 'Airing Today' },
    ],
  },
];

export default function NavLinks({ vertical = false }: { vertical?: boolean }) {
  return (
    <NavigationMenu
      className={cn({
        'grow-0 w-full max-w-full justify-start [&>div]:w-full': vertical,
      })}
    >
      <NavigationMenuList
        className={cn({ 'w-full flex-col items-start gap-4': vertical })}
      >
        {NAV_LINKS.map(({ href, label, children = [] }) => (
          <NavigationMenuItem
            key={href}
            className={cn({ '!m-0 w-full': vertical })}
          >
            {children.length ? (
              // eslint-disable-next-line react/no-children-prop
              <NavLinkGroup href={href} label={label} children={children} />
            ) : (
              <NavLink href={href} label={label} />
            )}
          </NavigationMenuItem>
        ))}
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavLinkGroup({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: { href: string; label: string }[];
}) {
  return (
    <>
      <div className='hidden md:flex'>
        <NavigationMenuTrigger className='bg-transparent pl-0 [&_svg]:ml-0'>
          <NavLink href={href} label={label} />
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className='flex flex-col gap-2 w-[300px]'>
            {children.map((child) => (
              <li key={child.href}>
                <NavLink href={child.href} label={child.label} />
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </div>
      <div className='md:hidden'>
        <NavLink href={href} label={label} />
        <ul className='flex flex-col gap-2 ml-4'>
          {children.map((child) => (
            <li key={child.href}>
              <NavLink href={child.href} label={child.label} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const isActive = useMemo(() => {
    if (href === '/') return pathname === href;
    if (tab) return (pathname + '?tab=' + tab).startsWith(href);
    return pathname.startsWith(href);
  }, [pathname, href, tab]);

  return (
    <NavigationMenuLink
      asChild
      active={pathname === href}
      className={cn(
        buttonVariants({ variant: 'link' }),
        {
          underline: isActive,
          'max-md:bg-accent': isActive && (tab ? href.includes(tab) : true),
        },
        'max-md:w-full max-md:justify-start'
      )}
    >
      <Link href={href}>{label}</Link>
    </NavigationMenuLink>
  );
}
