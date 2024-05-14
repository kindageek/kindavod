import VideoPlayer from './video-player';
import { getMovieDetailsById } from '@/services/tmdb/movie';
import Link from 'next/link';
import BackButtonLink from '@/components/back-button-link';

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
      <BackButtonLink />
      <img
        className='w-screen h-screen object-cover fixed top-0 left-0 right-0 z-[-1] filter blur-sm brightness-50'
        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.backdrop_path}`}
        alt={data.title}
      />
      <div className='flex flex-col gap-4 max-w-3xl'>
        <div className='flex items-start justify-center gap-4'>
          <img
            className='w-64 aspect-auto object-cover rounded-lg shadow-lg'
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.poster_path}`}
            alt={data.title}
          />
          <div className='flex flex-col gap-4'>
            <Link
              href={data.homepage || ''}
              target='_blank'
              className='hover:underline'
            >
              <h1 className='text-4xl font-bold'>{data.title}</h1>
            </Link>
            <p className='max-w-xl'>
              {new Date(data.release_date).getFullYear()},{' '}
              {data.genres.map((g) => g.name).join(', ')}
            </p>
            <p className='max-w-xl'>{data.runtime} minutes</p>
            <p className='max-w-xl'>{data.overview}</p>
          </div>
        </div>
        <VideoPlayer movieId={movieId} />
      </div>
    </main>
  );
}
