'use client';
import { getPopularMovies } from '@/services/tmdb/movie';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function MoviesList() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => getPopularMovies({ page }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className='flex flex-col items-center justify-between h-full gap-10'>
      <MoviesListPagination currentPage={page} />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {isFetching &&
          Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className='w-48 h-72' />
          ))}
        {data &&
          data.results.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className='flex flex-col items-center gap-2 relative hover:opacity-75 hover:scale-[1.025] transition-all duration-300 ease-in-out w-full'
            >
              <img
                className='w-full object-cover rounded'
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${movie.poster_path}`}
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
      <MoviesListPagination currentPage={page} />
    </div>
  );
}

function MoviesListPagination({ currentPage }: { currentPage: number }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined
            }
            href={`/movies?page=${currentPage - 1}`}
          />
        </PaginationItem>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={`/movies?page=${currentPage - 1}`}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive href='#'>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`/movies?page=${currentPage + 1}`}>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        {currentPage <= 1 && (
          <PaginationItem>
            <PaginationLink href={`/movies?page=${currentPage + 2}`}>
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href={`/movies?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
