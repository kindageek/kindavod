import { Button } from '@/components/ui/button';
import {
  getLatestMovies,
  getRecentlyAddedMovies,
} from '@/services/vidsrc/movie';
import Link from 'next/link';
import MoviesCarousel from '@/components/movies-carousel';

export const revalidate = 0;

export default async function Home() {
  const [latestMovies, recentlyAddedMovies] = await Promise.all([
    getLatestMovies(),
    getRecentlyAddedMovies(),
  ]);
  return (
    <main className='flex min-h-screen flex-col items-center p-24 gap-10'>
      <div className='flex flex-col text-center gap-1'>
        <h1 className='text-4xl font-bold'>KindaVOD</h1>
        <h2 className='text-lg'>Video on Demand</h2>
      </div>
      <div className='flex flex-col text-center gap-4'>
        <h2 className='text-xl font-bold'>Latest</h2>
        <MoviesCarousel data={latestMovies} />
      </div>
      <div className='flex flex-col text-center gap-4'>
        <h2 className='text-xl font-bold'>Recently Added</h2>
        <MoviesCarousel data={recentlyAddedMovies} />
      </div>
      <Button asChild variant='link'>
        <Link href='/movies'>All Movies</Link>
      </Button>
    </main>
  );
}
