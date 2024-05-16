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
    <div className='container flex flex-col items-start p-5 gap-8'>
      <BackButtonLink />
      <img
        className='w-screen h-screen object-cover fixed top-0 left-0 right-0 z-[-1] filter blur-sm brightness-50'
        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.backdrop_path}`}
        alt={data.name}
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
                <p className='text-sm md:text-base'>
                  {`${new Date(data.first_air_date).getFullYear()} - ${new Date(
                    data.last_air_date
                  ).getFullYear()}`}
                  , {data.genres.map((g) => g.name).join(', ')}
                </p>
                <p className='text-sm md:text-base'>
                  {data.number_of_seasons} season
                  {data.number_of_seasons > 1 && 's'}
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
