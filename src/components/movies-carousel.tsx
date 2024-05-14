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
import { MovieDetails } from '@/types/tmdb/movie';
import Image from 'next/image';

const POSTER_SIZES = { width: 144, height: 216 };

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
      const fulfilled = res.filter(
        (r) => r.status === 'fulfilled'
      ) as PromiseFulfilledResult<MovieDetails | null>[];
      return fulfilled.map((r) => r.value).filter((movie) => movie !== null);
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

  if (!data && isFetched) return null;

  if (isFetched && !movieDetails.length) {
    return <p>No movies found</p>;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
    >
      <CarouselContent>
        {isFetching &&
          Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className='basis-1/8'>
              <div className='w-full h-full flex flex-col items-center gap-2'>
                <Skeleton
                  className={`w-[${POSTER_SIZES.width}px] h-[${POSTER_SIZES.height}px] rounded`}
                />
                <div className='w-full flex flex-col text-center p-0.5 gap-1'>
                  <Skeleton className='w-full h-4' />
                  <Skeleton className='w-full h-4' />
                </div>
              </div>
            </CarouselItem>
          ))}
        {movieDetails.map((movie) =>
          movie ? (
            <CarouselItem key={movie.id} className='basis-1/8'>
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className={`group flex flex-col items-center gap-2 w-[${POSTER_SIZES.width}px]`}
              >
                <Image
                  width={POSTER_SIZES.width}
                  height={POSTER_SIZES.height}
                  className='rounded group-hover:opacity-75 group-hover:scale-[1.025] transition-all duration-300 ease-in-out'
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className='w-full flex flex-col text-center p-0.5'>
                  <h2 className='text-xs font-bold'>{movie.title}</h2>
                  <p className='text-xs'>
                    {new Date(movie.release_date).getFullYear()}
                    {', '}
                    {movie.production_countries[0]?.name}
                    {', '}
                    {movie.genres[0]?.name}
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
