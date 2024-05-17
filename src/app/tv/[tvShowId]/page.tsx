import VideoPlayer from '@/components/video-player';
import Link from 'next/link';
import BackButtonLink from '@/components/back-button-link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata, ResolvingMetadata } from 'next';
import { getTvShowDetailsById } from '@/services/tmdb/tv';

export async function generateMetadata(
  { params }: { params: { tvShowId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const tvShowId = params.tvShowId;

  // fetch data
  const tvShow = await getTvShowDetailsById(tvShowId);

  // optionally access and extend (rather than replace) parent metadata
  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];

  if (!tvShow) {
    return {
      title: 'TV Show | KindaVOD',
      description: 'Video on Demand by @kindadev',
      twitter: {
        site: 'KindaVOD',
        title: 'TV Show | KindaVOD',
        description: 'Video on Demand by @kindadev',
      },
      openGraph: {
        siteName: 'KindaVOD',
        title: 'TV Show | KindaVOD',
        description: 'Video on Demand by @kindadev',
        images: previousImages,
      },
    };
  }
  const title = `${tvShow.name} | KindaVOD`;
  const description = `${`${new Date(
    tvShow.first_air_date
  ).getFullYear()} - ${new Date(tvShow.last_air_date).getFullYear()}`}, ${
    tvShow.genres.at(0)?.name
  }, ${tvShow.production_countries?.at(0)?.name}`;
  const poster = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${tvShow.poster_path}`;
  return {
    title,
    description,
    twitter: {
      title,
      description,
      images: [poster, ...(parentMetadata.twitter?.images || [])],
    },
    openGraph: {
      title,
      description,
      images: [poster, ...(parentMetadata.openGraph?.images || [])],
    },
  };
}

export default async function MoviePage({
  params: { tvShowId },
}: {
  params: { tvShowId: string };
}) {
  const data = await getTvShowDetailsById(tvShowId);

  if (!data) {
    notFound();
  }

  return (
    <div className='container flex flex-col items-start py-4 md:py-10 gap-4 sm:gap-8 max-md:px-4'>
      <BackButtonLink />
      <img
        className='w-screen h-screen object-cover fixed top-0 left-0 right-0 z-[-1] filter blur-sm brightness-50'
        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.backdrop_path}`}
        alt={data.name}
      />
      <div className='flex flex-col items-center w-full'>
        <div className='flex flex-col items-center w-full max-w-screen-lg'>
          <div className='flex flex-col gap-10'>
            <div className='flex flex-col sm:flex-row items-center sm:items-start sm:justify-center gap-4'>
              <div className='relative min-w-40 md:min-w-64 aspect-[2/3]'>
                <Image
                  fill
                  style={{ objectFit: 'cover' }}
                  className='rounded-lg shadow'
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.poster_path}`}
                  alt={data.name}
                />
              </div>
              <div className='flex flex-col gap-4'>
                <Link
                  href={data.homepage || ''}
                  target='_blank'
                  className='hover:underline'
                >
                  <h1 className='text-2xl md:text-4xl font-bold'>
                    {data.name}
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
                  <b>Release:</b> {new Date(data.first_air_date).toDateString()}
                </p>
                {data.last_air_date && (
                  <p className='text-sm md:text-base'>
                    <b>Last episode:</b>{' '}
                    {new Date(data.last_air_date).toDateString()}
                  </p>
                )}
                <p className='text-sm md:text-base'>
                  <b>Genres:</b> {data.genres.map((c) => c.name).join(', ')}
                </p>
                <p className='text-sm md:text-base'>
                  <b>Counries:</b>{' '}
                  {data.production_countries.map((c) => c.name).join(', ')}
                </p>
                <p className='text-sm md:text-base'>
                  <b>Seasons:</b> {data.number_of_seasons} (
                  {data.number_of_episodes} episodes)
                </p>
                <p className='text-sm md:text-base'>{data.overview}</p>
              </div>
            </div>
            <VideoPlayer type='tv' id={tvShowId} />
          </div>
        </div>
      </div>
    </div>
  );
}
