import BackButtonLink from '@/components/back-button-link';
import MoviesList from './movies-list';

export const revalidate = 0;

export default function MoviesPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 gap-10'>
      <BackButtonLink />
      <MoviesList />
    </main>
  );
}
