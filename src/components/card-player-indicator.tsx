import { cn } from '@/lib/utils';
import { Info, Loader, Play, Ban } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMemo } from 'react';

export default function CardPlayerIndicator({
  status,
  type,
  className = '',
  size = 16,
}: {
  status: 'idle' | 'loading' | 'success' | 'error';
  type: 'movie' | 'tv';
  className?: string;
  size?: number;
}) {
  const tooltipText = useMemo(() => {
    if (status === 'idle') return '';
    if (status === 'loading') return '';
    const isMovie = type === 'movie';
    if (status === 'success')
      return `${isMovie ? 'Movie' : 'TV Show'} exists in the player`;
    if (status === 'error')
      return `${isMovie ? 'Movie' : 'TV Show'} missing in the player`;
  }, [status, type]);

  return (
    <span className={cn('flex items-center justify-center', className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className='flex items-center justify-center relative'>
              {status === 'idle' && <Info size={size} />}
              {status === 'loading' && (
                <Loader size={size} className='animate-spin' />
              )}
              {status === 'success' && <Play size={size} color='green' />}
              {status === 'error' && <Ban size={size} color='red' />}
            </div>
          </TooltipTrigger>
          <TooltipContent side='left'>{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
}
