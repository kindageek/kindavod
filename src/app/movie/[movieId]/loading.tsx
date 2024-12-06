import { Skeleton } from '@/components/ui/skeleton';

export default function MovieLoadingPage() {
  return (
    <div className='container flex flex-col items-start py-4 md:py-10 gap-4 sm:gap-8 max-md:px-4'>
      <Skeleton className='w-20 h-10' />
      <div className='flex flex-col items-center w-full'>
        <div className='flex flex-col items-center w-full max-w-screen-lg'>
          <div className='flex flex-col gap-10 w-full'>
            <div className='flex flex-col sm:flex-row items-center sm:items-start sm:justify-center gap-4 w-full'>
              <div className='relative min-w-40 md:min-w-64 aspect-[2/3]'>
                <Skeleton className='rounded-lg w-full h-full' />
              </div>
              <div className='flex flex-col gap-4 w-full'>
                <Skeleton className='w-1/2 h-10' />
                <Skeleton className='w-2/3 h-4' />
                <div className='flex items-center space-x-2 whitespace-nowrap'>
                  <Skeleton className='w-20 h-4' />
                  <Skeleton className='w-24 h-4' />
                </div>
                <Skeleton className='w-2/3 h-4' />
                <Skeleton className='w-2/3 h-4' />
                <Skeleton className='w-2/3 h-4' />
                <Skeleton className='w-2/3 h-4' />
                <div className='flex w-full flex-col gap-1 items-start'>
                  <Skeleton className='w-4/5 h-4' />
                  <Skeleton className='w-4/5 h-4' />
                  <Skeleton className='w-4/5 h-4' />
                  <Skeleton className='w-2/3 h-4' />
                </div>
              </div>
            </div>
            <Skeleton className='w-full aspect-video object-cover rounded' />
          </div>
        </div>
      </div>
    </div>
  );
}
