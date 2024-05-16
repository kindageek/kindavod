'use client';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function SearchInput() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchValue = new FormData(event.currentTarget).get(
      'kindavod-search'
    ) as string;
    if (!searchValue) return;
    router.push(`/search?q=${searchValue}&page=1`);
    inputRef.current?.blur();
    event.currentTarget.reset();
  }

  const [isFocused, setIsFocused] = useState(false);
  const isMac = (navigator?.userAgent || '').toUpperCase().indexOf('MAC') >= 0;
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window?.matchMedia) {
      setIsTouchDevice(window?.matchMedia('(pointer:coarse)')?.matches);
    }
    window.addEventListener('keydown', (event) => {
      if (event.metaKey && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    });
    () => window.removeEventListener('keydown', () => {});
  }, []);

  return (
    <form onSubmit={handleSubmit} className='relative ml-auto flex-1 md:grow-0'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        name='kindavod-search'
        type='search'
        placeholder='Search...'
        className={cn(
          'w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]',
          { 'lg:pr-8': !isTouchDevice }
        )}
      />
      {!isTouchDevice && (
        <kbd className='absolute right-2.5 top-[50%] translate-y-[-50%] hidden lg:flex items-center text-sm font-sans font-medium text-slate-400'>
          {isFocused ? '↵' : isMac ? '⌘ + K' : 'Ctrl + K'}
        </kbd>
      )}
    </form>
  );
}
