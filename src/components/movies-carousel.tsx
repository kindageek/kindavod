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
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      'latest-movies-details',
      ...(data?.result.items || []).map((movie) => movie.tmdb_id),
    ],
    queryFn: () => {
      if (!data) return [];
      return Promise.all(
        data.result.items.map((movie) => getMovieDetailsById(movie.tmdb_id))
      );
    },
    enabled: !!data,
    select: (data) => data.filter((movie) => movie !== null),
    initialData: [],
    placeholderData: [],
  });

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data, refetch]);

  if (!data) return null;

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className='w-full max-w-5xl'
    >
      <CarouselContent>
        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem key={index} className='basis-1/8'>
              <Skeleton className='w-24 aspect-[2/3] rounded' />
            </CarouselItem>
          ))}
        {movieDetails.map((movie) => (
          <CarouselItem key={movie.id} className='basis-1/8'>
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className='flex flex-col items-center gap-2 relative hover:opacity-75 hover:scale-[1.025] transition-all duration-300 ease-in-out'
            >
              <img
                className='w-24 aspect-[2/3] rounded'
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
              <div className='flex flex-col text-center absolute bottom-0 backdrop-blur-[1px] w-full p-0.5 bg-gradient-to-b from-transparent to-slate-900'>
                <h2 className='text-xs font-bold'>{movie.title}</h2>
                <p className='text-xs'>
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
