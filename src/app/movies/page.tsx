import MoviesList from './movies-list';

export const revalidate = 0;

export default function MoviesPage() {
  return (
    <div className='container flex flex-col items-center p-5 gap-8'>
      <MoviesList />
    </div>
  );
}
