'use client';
import { getSearchResult } from '@/services/tmdb';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import VodPagination from '../vod-pagination';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { SearchResultItem } from '@/types/tmdb/search';
import { Clapperboard, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchResultCard from './search-result-card';

export default function SearchResult() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const query = searchParams.get('q') || '';

  const { data, isFetching } = useQuery({
    queryKey: ['search', query, page],
    queryFn: () => getSearchResult({ query, page }),
    placeholderData: keepPreviousData,
  });

  const list = useMemo(() => {
    if (!data) return [];
    return data.results;
  }, [data]);

  return (
    <div className='flex flex-col items-center justify-between h-full w-full gap-8'>
      <VodPagination
        baseUrl={`/search?q=${query}`}
        paramPrefix='&'
        currentPage={page}
      />
      <div className='flex flex-wrap justify-center gap-4'>
        {isFetching &&
          Array.from({ length: 20 }).map((_, index) => (
            <Skeleton
              key={index}
              className='w-32 sm:w-40 md:w-48 lg:w-60 aspect-[2/3]'
            />
          ))}
        {list?.map((item) => (
          <SearchResultCard key={item.id} item={item} />
        ))}
      </div>
      <VodPagination
        baseUrl={`/search?q=${query}`}
        paramPrefix='&'
        currentPage={page}
      />
    </div>
  );
}
