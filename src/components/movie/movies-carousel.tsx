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
import CarouselCards, { CarouselCardInfo } from '../carousel-cards';

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
    queryKey: ['movies-details', JSON.stringify(data)],
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
    select: (data) => {
      return data.map((movie) => ({
        id: movie.id,
        title: movie.title,
        date: new Date(movie.release_date).getFullYear().toString(),
        imgUrl: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${movie.poster_path}`,
        url: `/movies/${movie.id}`,
        type: 'movie',
      })) as CarouselCardInfo[];
    },
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
    <CarouselCards
      data={movieDetails as CarouselCardInfo[]}
      loading={isFetching}
    />
  );
}
