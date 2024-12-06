import { Skeleton } from '@/components/ui/skeleton';

export default function HomeLoadingPage() {
  return (
    <div className='flex flex-col items-center pl-[4vw] pb-10 gap-[4vw]'>
      <section aria-label='Hero' className='w-full'>
        <div className='absolute inset-0 z-0 h-[100vw] w-full sm:h-[56.25vw]'>
          <div className='absolute inset-0'>
            <div className='absolute bottom-[35%] left-[4%] top-0 z-10 flex w-[50%] md:w-[36%] flex-col items-start justify-end gap-2 lg:gap-4'>
              <Skeleton className='h-12 w-[250px]' />
              <div className='flex flex-col items-start gap-1 lg:gap-2'>
                <div className='flex items-center space-x-2 whitespace-nowrap'>
                  <Skeleton className='h-5 w-20' />
                  <Skeleton className='h-5 w-20' />
                  <Skeleton className='h-5 w-20' />
                </div>
                <div className='hidden md:flex w-full flex-col items-start gap-1'>
                  <Skeleton className='w-full h-6' />
                  <Skeleton className='w-full h-6' />
                  <Skeleton className='w-3/4 h-6' />
                </div>
              </div>
              <Skeleton className='h-10 w-[124px] mt-4' />
            </div>
          </div>
        </div>
        <div className='relative inset-0 -z-50 mb-5 pb-[60%] sm:pb-[40%]'></div>
      </section>
      {Array.from({ length: 5 }).map((_, index) => (
        <section
          className='flex flex-col gap-2 w-full z-0 overflow-auto no-scrollbar'
          key={index}
        >
          <Skeleton className='h-7 w-[200px]' />
          <div className='w-full relative'>
            <div className='overflow-x-auto overflow-y-hidden no-scrollbar'>
              <div
                className='flex ml-0 gap-1'
                style={{
                  transform: 'translate3d(0px, 0px, 0px)',
                }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div className='min-w-0 shrink-0 grow-0 pl-1 basis-1/8 py-0.5 rounded'>
                    <Skeleton
                      key={`${index}-${i}`}
                      className='w-[130px] md:w-[180px] lg:w-[250px] aspect-[2/3] h-auto'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
