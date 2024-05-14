import MoviesCarouselTabs from '@/components/movies-carousel-tabs';

export const revalidate = 0;

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-10 gap-8'>
      <div className='flex flex-col text-center gap-1'>
        <h1 className='text-4xl font-bold'>KindaVOD</h1>
        <h2 className='text-lg'>Video on Demand</h2>
      </div>
      <MoviesCarouselTabs />
    </main>
  );
}
