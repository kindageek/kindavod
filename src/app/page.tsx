import { Button } from '@/components/ui/button';
import { getPopularMovies } from '@/services/tmdb/movie';
import Link from 'next/link';

export default async function Home() {
  const data = await getPopularMovies({ page: 1 });
  return (
    <main className='flex min-h-screen flex-col items-center p-24 gap-10'>
      <div className='flex flex-col text-center gap-1'>
        <h1 className='text-4xl font-bold'>KindaVOD</h1>
        <h2 className='text-lg'>Video on Demand</h2>
      </div>
      <Button asChild variant='link'>
        <Link href='/movies'>Movies</Link>
      </Button>
    </main>
  );
}
