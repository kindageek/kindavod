'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  },
  {
    href: '/tv',
    label: 'TV Shows',
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
        className={cn({
          'w-full flex-col items-start gap-4': vertical,
          'flex items-center gap-10': !vertical,
        })}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <NavigationMenuItem
            key={href}
            className={cn({ '!m-0 w-full flex items-start': vertical })}
          >
            <NavLink href={href} label={label} vertical={vertical} />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavLink({
  href,
  label,
  vertical,
}: {
  href: string;
  label: string;
  vertical?: boolean;
}) {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  }, [pathname, href]);

  return (
    <NavigationMenuLink
      asChild
      active={pathname === href}
      className={cn(
        'text-sm text-muted-foreground hover:text-accent-foreground transition-colors',
        {
          'text-foreground': isActive,
          'w-full p-2 rounded-e border-l-2 border-transparent transition-all hover:border-accent-foreground hover:bg-accent':
            vertical,
          'bg-accent border-accent-foreground': vertical && isActive,
        }
      )}
    >
      <Link href={href}>{label}</Link>
    </NavigationMenuLink>
  );
}
