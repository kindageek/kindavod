import { env } from '@/env';
import VideoPlayer from './video-player';
import { getMovieDetailsById } from '@/services/tmdb/movie';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function MoviePage({
  params: { movieId },
}: {
  params: { movieId: string };
}) {
  const data = await getMovieDetailsById(movieId);
  if (!data) {
    return <div>Failed to fetch data</div>;
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 p-24'>
      <Button asChild variant='link'>
        <Link href='/'>Back</Link>
      </Button>
      <img
        className='w-screen h-full object-cover absolute top-0 left-0 right-0 z-[-1] filter blur-sm brightness-50'
        src={`${env.TMDB_IMAGE_URL}${data.backdrop_path}`}
        alt={data.title}
      />
      <Link
        href={data.homepage || ''}
        target='_blank'
        className='hover:underline'
      >
        <h1 className='text-4xl font-bold'>{data.title}</h1>
      </Link>
      <p className='text-center max-w-xl'>
        {new Date(data.release_date).getFullYear()},{' '}
        {data.genres.map((g) => g.name).join(', ')}
      </p>
      <p className='text-center max-w-xl'>{data.runtime} minutes</p>
      <p className='text-center max-w-xl'>{data.overview}</p>
      <VideoPlayer movieId={movieId} />
    </main>
  );
}
