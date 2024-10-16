import { Metadata } from 'next';
import TvShowsList from '../../components/tv/tv-shows-list';
import { getTvShows } from '@/services/tmdb/tv';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'TV Shows | KindaVOD',
  description: 'Video on Demand by @kindadev',
  twitter: {
    title: 'TV Shows | KindaVOD',
    description: 'Video on Demand by @kindadev',
  },
  openGraph: {
    title: 'TV Shows | KindaVOD',
    description: 'Video on Demand by @kindadev',
  },
};

export default async function TvShowsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const tab = (searchParams?.tab as string) || 'popular';
  const page = Number(searchParams?.page || 1);

  const data = await getTvShows({
    page,
    category: tab,
  });
  return (
    <div className='container flex flex-col items-center py-4 md:py-10 gap-4 sm:gap-8 max-md:px-4'>
      <TvShowsList data={data} page={page} tab={tab} />
    </div>
  );
}
