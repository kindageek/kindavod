import BackButtonLink from '@/components/back-button-link';
import { getPopularMovies } from '@/services/tmdb/movie';
import Link from 'next/link';

export default async function MoviesPage() {
  const data = await getPopularMovies({ page: 1 });

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 gap-10'>
      <BackButtonLink />
      <div className='grid grid-cols-5 gap-4'>
        {data &&
          data.results.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className='flex flex-col items-center gap-2 relative hover:opacity-75 hover:scale-[1.025] transition-all duration-300 ease-in-out'
            >
              <img
                className='w-48 object-cover aspect-auto rounded'
                src={`${process.env.TMDB_IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
              <div className='flex flex-col text-center absolute bottom-0 backdrop-blur-[1px] w-full p-0.5 bg-gradient-to-b from-transparent to-slate-900'>
                <h2 className='text-sm font-bold'>{movie.title}</h2>
                <p className='text-xs'>
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}
