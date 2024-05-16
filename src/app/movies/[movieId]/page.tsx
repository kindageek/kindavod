import VideoPlayer from '@/components/video-player';
import { getMovieDetailsById } from '@/services/tmdb/movie';
import Link from 'next/link';
import BackButtonLink from '@/components/back-button-link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: { params: { movieId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const movieId = params.movieId;

  // fetch data
  const movie = await getMovieDetailsById(movieId);

  // optionally access and extend (rather than replace) parent metadata
  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];

  if (!movie) {
    return {
      title: 'Movie | KindaVOD',
      description: 'Video on Demand by @kindadev',
      twitter: {
        site: 'KindaVOD',
        title: 'Movie | KindaVOD',
        description: 'Video on Demand by @kindadev',
      },
      openGraph: {
        siteName: 'KindaVOD',
        title: 'Movie | KindaVOD',
        description: 'Video on Demand by @kindadev',
        images: previousImages,
      },
    };
  }
  const title = `${movie.title} | KindaVOD`;
  const description = `${movie.release_date}, ${movie.genres.at(0)?.name}, ${
    movie.production_countries?.at(0)?.name
  }`;
  const poster = movie.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${movie.poster_path}`
    : null;
  return {
    title,
    description,
    twitter: {
      title,
      description,
      images: poster
        ? [poster, ...(parentMetadata.twitter?.images || [])]
        : parentMetadata.twitter?.images || [],
    },
    openGraph: {
      title,
      description,
      images: poster
        ? [poster, ...(parentMetadata.openGraph?.images || [])]
        : parentMetadata.openGraph?.images || [],
    },
  };
}

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
      {data.backdrop_path && (
        <img
          className='w-screen h-screen object-cover fixed top-0 left-0 right-0 z-[-1] filter blur-sm brightness-50'
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.backdrop_path}`}
          alt={data.title}
        />
      )}
      <div className='flex flex-col items-center w-full'>
        <div className='flex flex-col items-center w-full max-w-screen-lg'>
          <div className='flex flex-col gap-10'>
            <div className='flex items-start justify-center gap-4'>
              {data.poster_path && (
                <div className='relative min-w-40 md:min-w-64 aspect-[2/3]'>
                  <Image
                    fill
                    objectFit='cover'
                    className='rounded-lg shadow'
                    src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.poster_path}`}
                    alt={data.title}
                  />
                </div>
              )}
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
                {data.tagline && (
                  <p className='text-sm md:text-base italic'>{data.tagline}</p>
                )}
                {data.vote_average && (
                  <p className='text-sm md:text-base'>
                    <b>Rating:</b> {data.vote_average}/10 ({data.vote_count}{' '}
                    votes)
                  </p>
                )}
                <p className='text-sm md:text-base'>
                  <b>Release:</b> {new Date(data.release_date).toDateString()}
                </p>
                <p className='text-sm md:text-base'>
                  <b>Genres:</b> {data.genres.map((c) => c.name).join(', ')}
                </p>
                <p className='text-sm md:text-base'>
                  <b>Counries:</b>{' '}
                  {data.production_countries.map((c) => c.name).join(', ')}
                </p>
                <p className='text-sm md:text-base'>
                  <b>Runtime:</b> {data.runtime} minutes
                </p>
                <p className='text-sm md:text-base'>{data.overview}</p>
              </div>
            </div>
            <VideoPlayer type='movie' id={movieId} />
          </div>
        </div>
      </div>
    </div>
  );
}
