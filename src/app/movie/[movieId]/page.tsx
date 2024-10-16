import VideoPlayer from '@/components/video-player';
import { getMovieDetailsById } from '@/services/tmdb/movie';
import Link from 'next/link';
import BackButtonLink from '@/components/back-button-link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata, ResolvingMetadata } from 'next';
import { formatReleaseDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(
  { params }: { params: { movieId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const movieId = params.movieId;
  const movie = await getMovieDetailsById(movieId);
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
    <div className='container flex flex-col items-start py-4 md:py-10 gap-4 sm:gap-8 max-md:px-4'>
      <BackButtonLink />
      {data.backdrop_path && (
        <img
          className='w-screen h-dvh object-cover fixed top-0 left-0 right-0 z-[-1] filter blur-sm brightness-50'
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.backdrop_path}`}
          alt={data.title}
        />
      )}
      <div className='flex flex-col items-center w-full'>
        <div className='flex flex-col items-center w-full max-w-screen-lg'>
          <div className='flex flex-col gap-10'>
            <div className='flex flex-col sm:flex-row items-center sm:items-start sm:justify-center gap-4'>
              {data.poster_path && (
                <div className='relative min-w-40 md:min-w-64 aspect-[2/3]'>
                  <Image
                    fill
                    className='rounded-lg shadow'
                    src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.poster_path}`}
                    alt={data.title}
                    style={{ objectFit: 'cover' }}
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
                  <p className='text-xs lg:text-sm italic'>{data.tagline}</p>
                )}
                <div className='flex items-center space-x-2 whitespace-nowrap'>
                  {data.vote_average && (
                    <p className='text-green-500 text-xs lg:text-sm'>
                      {Math.round(data?.vote_average * 10) ?? '-'}% Match
                    </p>
                  )}
                  {data?.release_date && (
                    <p className='text-muted-foreground text-xs lg:text-sm'>
                      {formatReleaseDate(data.release_date)}
                    </p>
                  )}
                </div>
                <p className='text-xs lg:text-sm'>
                  <span className='text-muted-foreground font-semibold'>
                    Genres:
                  </span>{' '}
                  {data.genres.map((c) => c.name).join(', ')}
                </p>
                <p className='text-xs lg:text-sm'>
                  <span className='text-muted-foreground font-semibold'>
                    Counries:
                  </span>{' '}
                  {data.production_countries.map((c) => c.name).join(', ')}
                </p>
                <p className='text-xs lg:text-sm'>
                  <span className='text-muted-foreground font-semibold'>
                    Companies:
                  </span>{' '}
                  {data.production_companies.map((c) => c.name).join(', ')}
                </p>
                <p className='text-xs lg:text-sm'>
                  <span className='text-muted-foreground font-semibold'>
                    Runtime:
                  </span>{' '}
                  {data.runtime} minutes
                </p>
                <p className='text-xs lg:text-sm'>{data.overview}</p>
              </div>
            </div>
            <VideoPlayer type='movie' id={movieId} />
          </div>
        </div>
      </div>
    </div>
  );
}
