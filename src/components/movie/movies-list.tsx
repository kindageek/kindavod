'use client';
import { getMovies } from '@/services/tmdb/movie';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import VodPagination from '@/components/vod-pagination';
import MovieListCard from './movie-list-card';
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
    id: 'now_playing',
    name: 'Now Playing',
  },
  {
    id: 'upcoming',
    name: 'Upcoming',
  },
];

export default function MoviesList() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = parseInt(searchParams.get('page') || '1');
  const tab = searchParams.get('tab') || 'popular';

  const { data, isFetching } = useQuery({
    queryKey: ['popularMovies', page, tab],
    queryFn: () => getMovies({ page, category: tab }),
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
        baseUrl={`/movies?tab=${tab}`}
        paramPrefix='&'
        currentPage={page}
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
          data.results.map((movie) => (
            <MovieListCard key={movie.id} item={movie} />
          ))}
      </div>
      <VodPagination
        baseUrl={`/movies?tab=${tab}`}
        paramPrefix='&'
        currentPage={page}
      />
    </div>
  );
}
