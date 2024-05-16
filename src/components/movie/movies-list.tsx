'use client';
import { getPopularMovies } from '@/services/tmdb/movie';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import VodPagination from '@/components/vod-pagination';
import MovieListCard from './movie-list-card';

export default function MoviesList() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { data, isFetching } = useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => getPopularMovies({ page }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className='flex flex-col items-center justify-between h-full w-full gap-8'>
      <VodPagination baseUrl='/movies' currentPage={page} />
      <div className='flex flex-wrap justify-center gap-4'>
        {isFetching &&
          Array.from({ length: 20 }).map((_, index) => (
            <Skeleton
              key={index}
              className='w-32 sm:w-40 md:w-48 lg:w-60 aspect-[2/3]'
            />
          ))}
        {data &&
          data.results.map((movie) => (
            <MovieListCard key={movie.id} item={movie} />
          ))}
      </div>
      <VodPagination baseUrl='/movies' currentPage={page} />
    </div>
  );
}
