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
import CarouselCards, { CarouselCardInfo } from '../carousel-cards';

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
    select: (data) => {
      return data.map((tvShow) => ({
        id: tvShow.id,
        title: tvShow.name,
        date: `${new Date(tvShow.first_air_date).getFullYear().toString()}`,
        imgUrl: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${tvShow.poster_path}`,
        url: `/tv/${tvShow.id}`,
      })) as CarouselCardInfo[];
    },
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
    <CarouselCards data={list as CarouselCardInfo[]} loading={isFetching} />
  );
}
