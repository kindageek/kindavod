import VideoPlayer from './video-player';
import { getMovieDetailsById } from '@/services/tmdb/movie';
import Link from 'next/link';
import BackButtonLink from '@/components/back-button-link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function MoviePage({
  params: { movieId },
}: {
  params: { movieId: string };
}) {
  const data = await getMovieDetailsById(movieId);

  if (!data) {
    notFound();
  }

  return (
    <div className='container flex flex-col items-start p-5 gap-8'>
      <BackButtonLink />
      <img
        className='w-screen h-screen object-cover fixed top-0 left-0 right-0 z-[-1] filter blur-sm brightness-50'
        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.backdrop_path}`}
        alt={data.title}
      />
      <div className='flex flex-col items-center w-full'>
        <div className='flex flex-col items-center w-full max-w-screen-lg'>
          <div className='flex flex-col gap-10'>
            <div className='flex items-start justify-center gap-4'>
              <div className='relative min-w-40 md:min-w-64 aspect-[2/3]'>
                <Image
                  fill
                  objectFit='cover'
                  className='rounded-lg shadow'
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.poster_path}`}
                  alt={data.title}
                />
              </div>
              <div className='flex flex-col gap-4'>
                <Link
                  href={data.homepage || ''}
                  target='_blank'
                  className='hover:underline'
                >
                  <h1 className='text-2xl md:text-4xl font-bold'>
                    {data.title}
                  </h1>
                </Link>
                <p className='text-sm md:text-base'>
                  {new Date(data.release_date).getFullYear()},{' '}
                  {data.genres.map((g) => g.name).join(', ')}
                </p>
                <p className='text-sm md:text-base'>{data.runtime} minutes</p>
                <p className='text-sm md:text-base'>{data.overview}</p>
              </div>
            </div>
            <VideoPlayer movieId={movieId} />
          </div>
        </div>
      </div>
    </div>
  );
}
