import { Metadata } from 'next';
import MoviesList from '../../components/movie/movies-list';

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

export default function MoviesPage() {
  return (
    <div className='container flex flex-col items-center p-5 gap-8'>
      <MoviesList />
    </div>
  );
}
