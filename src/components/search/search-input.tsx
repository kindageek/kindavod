'use client';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function SearchInput({
  fullWidth = false,
}: {
  fullWidth?: boolean;
}) {
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
  const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleSearchInput = () => {
    if (isExpanded) return;
    setIsExpanded(true);
    inputRef.current?.focus();
  };

  const unfocusSearchInput = () => {
    setIsExpanded(false);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative transition-all duration-300 flex items-center', {
        'flex-1 md:grow-0': !fullWidth,
        'w-full': fullWidth,
      })}
    >
      <Button
        variant='ghost'
        size='icon'
        title='Search'
        type={isExpanded || fullWidth ? 'submit' : 'button'}
        onClick={toggleSearchInput}
        className={cn('size-4 md:size-6 hover:bg-transparent', {
          'absolute left-2.5 top-1/2 translate-y-[-50%] size-4':
            isExpanded || fullWidth,
        })}
      >
        <Search
          className={cn('size-6', { 'size-4': isExpanded || fullWidth })}
        />
      </Button>
      <Input
        ref={inputRef}
        autoComplete='off'
        onFocus={() => setIsFocused(true)}
        onBlur={unfocusSearchInput}
        name='kindavod-search'
        type='search'
        placeholder='Search...'
        className={cn(
          'transition-all duration-300 overflow-hidden py-1 md:py-2 h-8 md:h-10',
          { 'lg:pr-8': !isTouchDevice && fullWidth },
          {
            'rounded-lg bg-background pl-8 w-full md:w-[200px] lg:w-[336px]':
              isExpanded || fullWidth,
          },
          { 'w-0 border-none p-0': !isExpanded && !fullWidth }
        )}
        tabIndex={isExpanded ? 0 : -1}
      />
      {!isTouchDevice && (
        <kbd
          className={cn(
            'absolute right-2.5 top-1/2 translate-y-[-50%] hidden lg:flex items-center text-sm font-sans font-medium text-slate-400 transition-all duration-300 overflow-hidden',
            { 'w-0': !isExpanded && !fullWidth }
          )}
        >
          {isFocused ? '↵' : isMac ? '⌘ + K' : 'Ctrl + K'}
        </kbd>
      )}
    </form>
  );
}
