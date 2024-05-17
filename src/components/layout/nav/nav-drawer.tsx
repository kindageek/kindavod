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

export default function NavDrawer() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={20} />
      </SheetTrigger>
      <SheetContent side='top' className='min-h-[80%] flex flex-col'>
        <SheetHeader>
          <SheetTitle>KindaVOD</SheetTitle>
        </SheetHeader>
        <div className='w-full h-full py-4 flex-1 flex flex-col items-start gap-4'>
          <SearchInput fullWidth />
          <NavLinks vertical />
        </div>
        <SheetFooter>
          <Footer />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
