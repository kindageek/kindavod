import { Metadata } from 'next';
import MoviesList from '../../components/movie/movies-list';
import { getMovies } from '@/services/tmdb/movie';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Movies | KindaVOD',
  description: 'Video on Demand by @kindadev',
  twitter: {
    title: 'Movies | KindaVOD',
    description: 'Video on Demand by @kindadev',
  },
  openGraph: {
    title: 'Movies | KindaVOD',
    description: 'Video on Demand by @kindadev',
  },
};

export default async function MoviesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const tab = (searchParams?.tab as string) || 'popular';
  const page = Number(searchParams?.page || 1);

  const data = await getMovies({
    page,
    category: tab,
  });

  return (
    <div className='container flex flex-col items-center py-4 md:py-10 gap-4 sm:gap-8 max-md:px-4'>
      <MoviesList data={data} page={page} tab={tab} />
    </div>
  );
}
