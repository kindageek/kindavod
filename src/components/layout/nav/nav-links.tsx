'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { buttonVariants } from '../../ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS: {
  href: string;
  label: string;
  disabled?: boolean;
}[] = [
  { href: '/', label: 'Home' },
  { href: '/movies', label: 'Movies' },
  { href: '/tv', label: 'TV Shows' },
];

export default function NavLinks({ vertical = false }: { vertical?: boolean }) {
  const pathname = usePathname();
  return (
    <NavigationMenu className={cn({ 'grow-0 w-full': vertical })}>
      <NavigationMenuList
        className={cn({ 'w-full flex-col items-start gap-4': vertical })}
      >
        {NAV_LINKS.map(({ href, label, disabled = false }) => (
          <NavigationMenuItem key={href} className={cn({ '!m-0': vertical })}>
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
  );
}
