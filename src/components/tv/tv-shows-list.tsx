'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { getTvShows } from '@/services/tmdb/tv';
import VodPagination from '@/components/vod-pagination';
import TvShowListCard from './tv-show-list-card';
import TabSelect from '../tab-select';

const TABS = [
  {
    id: 'popular',
    name: 'Popular',
  },
  {
    id: 'top_rated',
    name: 'Top Rated',
  },
  {
    id: 'on_the_air',
    name: 'On The Air',
  },
  {
    id: 'airing_today',
    name: 'Airing Today',
  },
];

export default function TvShowsList() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = parseInt(searchParams.get('page') || '1');
  const tab = searchParams.get('tab') || 'popular';

  const { data, isFetching } = useQuery({
    queryKey: ['tvShows', page, tab],
    queryFn: () => getTvShows({ page, category: tab }),
    placeholderData: keepPreviousData,
  });

  function onTabChange(tabId: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('tab', tabId);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='flex flex-col items-center justify-between h-full w-full gap-4 sm:gap-8'>
      <TabSelect tabs={TABS} tabId={tab} onTabChange={onTabChange} />
      <VodPagination
        baseUrl={`/tv?tab=${tab}`}
        paramPrefix='&'
        currentPage={page}
        totalPages={data?.total_pages}
      />
      <div className='flex flex-wrap justify-center gap-4'>
        {isFetching &&
          Array.from({ length: 20 }).map((_, index) => (
            <Skeleton
              key={index}
              className='w-36 sm:w-40 md:w-48 lg:w-60 aspect-[2/3]'
            />
          ))}
        {data &&
          data.results.map((item) => (
            <TvShowListCard key={item.id} item={item} />
          ))}
      </div>
      <VodPagination
        baseUrl={`/tv?tab=${tab}`}
        paramPrefix='&'
        currentPage={page}
        totalPages={data?.total_pages}
      />
    </div>
  );
}
