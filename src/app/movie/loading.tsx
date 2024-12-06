import { Skeleton } from '@/components/ui/skeleton';

export default function MoviesLoadingPage() {
  return (
    <div className='container flex flex-col items-center py-4 md:py-10 gap-4 sm:gap-8 max-md:px-4'>
      <div className='flex flex-col items-center justify-between h-full w-full gap-4 sm:gap-8'>
        <div className='inline-flex h-10 items-center justify-center rounded-md gap-1  p-1'>
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-24' />
        </div>
        <div className='flex flex-row items-center gap-1'>
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton className='size-10' key={i} />
          ))}
        </div>
        <div className='flex flex-wrap justify-center gap-4'>
          {Array.from({ length: 20 }).map((_, i) => (
            <Skeleton
              className='w-36 sm:w-40 md:w-48 lg:w-60 aspect-[2/3]'
              key={i}
            />
          ))}
        </div>
        <div className='flex flex-row items-center gap-1'>
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton className='size-10' key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
