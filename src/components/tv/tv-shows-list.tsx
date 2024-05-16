'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { getTvShows } from '@/services/tmdb/tv';
import VodPagination from '@/components/vod-pagination';
import TvShowListCard from './tv-show-list-card';

export default function TvShowsList() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { data, isFetching } = useQuery({
    queryKey: ['tvShows', page],
    queryFn: () => getTvShows({ page }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className='flex flex-col items-center justify-between h-full w-full gap-8'>
      <VodPagination baseUrl='/tv' currentPage={page} />
      <div className='flex flex-wrap justify-center gap-4'>
        {isFetching &&
          Array.from({ length: 20 }).map((_, index) => (
            <Skeleton
              key={index}
              className='w-32 sm:w-40 md:w-48 lg:w-60 aspect-[2/3]'
            />
          ))}
        {data &&
          data.results.map((item) => (
            <TvShowListCard key={item.id} item={item} />
          ))}
      </div>
      <VodPagination baseUrl='/tv' currentPage={page} />
    </div>
  );
}
