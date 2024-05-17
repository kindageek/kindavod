'use client';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import NavLinks from './nav-links';
import SearchInput from '@/components/search/search-input';
import Footer from '../footer';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu size={20} />
      </SheetTrigger>
      <SheetContent
        side='top'
        className='h-dvh flex flex-col p-4'
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>KindaVOD</SheetTitle>
        </SheetHeader>
        <div className='w-full h-full overflow-hidden p-1 flex-1 flex flex-col items-start gap-4'>
          <SearchInput fullWidth />
          <div className='w-full h-full flex-1 overflow-auto pr-1'>
            <NavLinks vertical />
          </div>
        </div>
        <SheetFooter>
          <Footer fullWidth />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
