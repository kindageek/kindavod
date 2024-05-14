'use client';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { LatestItemsListResponse } from '@/types/vidsrc';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetailsById } from '@/services/tmdb/movie';
import { useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

export default function MoviesCarousel({
  data,
}: {
  data: LatestItemsListResponse | null;
}) {
  const {
    data: movieDetails,
    isFetching,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ['latest-movies-details', JSON.stringify(data)],
    queryFn: async () => {
      if (!data) return [];
      const res = await Promise.allSettled(
        data.result.items.map((movie) => getMovieDetailsById(movie.tmdb_id))
      );
      return res
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value)
        .filter((movie) => movie !== null);
    },
    enabled: !!data,
    initialData: [],
    placeholderData: [],
  });

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data, refetch]);

  if (!data) return null;

  if (isFetched && !movieDetails.length) {
    return <p>No movies found</p>;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className='w-full max-w-5xl'
    >
      <CarouselContent>
        {isFetching &&
          Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem key={index} className='basis-1/8 h-36'>
              <Skeleton className='w-24 aspect-[2/3] rounded' />
            </CarouselItem>
          ))}
        {movieDetails.map((movie) =>
          movie ? (
            <CarouselItem key={movie.id} className='basis-1/8 h-36'>
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className='flex flex-col items-center gap-2 relative hover:opacity-75 hover:scale-[1.025] transition-all duration-300 ease-in-out'
              >
                <img
                  className='w-24 h-36 rounded'
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className='w-24 flex flex-col text-center absolute bottom-0 backdrop-blur-[1px] p-0.5 bg-gradient-to-b from-transparent to-slate-900 rounded-b'>
                  <h2 className='text-xs font-bold'>{movie.title}</h2>
                  <p className='text-xs'>
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </div>
              </Link>
            </CarouselItem>
          ) : null
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
