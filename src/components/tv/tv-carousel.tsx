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
import { Skeleton } from '../ui/skeleton';
import { MovieDetails } from '@/types/tmdb/movie';
import Image from 'next/image';
import { getTvShowDetailsById } from '@/services/tmdb/tv';
import { TvShowDetails } from '@/types/tmdb/tv';

const POSTER_SIZES = { width: 144, height: 216 };

export default function TvShowsCarousel({
  data,
}: {
  data: LatestItemsListResponse | null;
}) {
  const {
    data: list,
    isFetching,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ['tv-shows-details', JSON.stringify(data)],
    queryFn: async () => {
      if (!data) return [];
      const res = await Promise.allSettled(
        data.result.items.map((item) => getTvShowDetailsById(item.tmdb_id))
      );
      const fulfilled = res.filter(
        (r) => r.status === 'fulfilled'
      ) as PromiseFulfilledResult<TvShowDetails | null>[];
      return fulfilled.map((r) => r.value).filter((item) => item !== null);
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

  if (isFetched && !list.length) {
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
              <div
                className={`flex flex-col items-center gap-2`}
                style={{
                  width: POSTER_SIZES.width,
                }}
              >
                <Skeleton
                  style={{
                    width: POSTER_SIZES.width,
                    height: POSTER_SIZES.height,
                  }}
                  className='rounded'
                />
                <div className='w-full flex flex-col text-center p-0.5 gap-1'>
                  <Skeleton className='w-full h-4' />
                  <Skeleton className='w-full h-4' />
                </div>
              </div>
            </CarouselItem>
          ))}
        {list.map((item) =>
          item ? (
            <CarouselItem key={item.id} className='basis-1/8'>
              <Link
                key={item.id}
                href={`/movies/${item.id}`}
                className={`group flex flex-col items-center gap-2`}
                style={{
                  width: POSTER_SIZES.width,
                  maxWidth: POSTER_SIZES.width,
                }}
              >
                <Image
                  width={POSTER_SIZES.width}
                  height={POSTER_SIZES.height}
                  className='rounded group-hover:opacity-75 group-hover:scale-[1.025] transition-all duration-300 ease-in-out'
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${item.poster_path}`}
                  alt={item.name}
                />
                <div
                  className='w-full flex flex-col text-center p-0.5'
                  style={{
                    width: POSTER_SIZES.width,
                  }}
                >
                  <p className='text-xs font-bold'>{item.name}</p>
                  <p className='text-xs'>
                    {`${new Date(
                      item.first_air_date
                    ).getFullYear()} - ${new Date(
                      item.last_air_date
                    ).getFullYear()}`}
                    {', '}
                    {item.production_countries[0]?.name}
                    {', '}
                    {item.genres[0]?.name}
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
