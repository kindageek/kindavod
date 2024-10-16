import VodPagination from '@/components/vod-pagination';
import TvShowListCard from './tv-show-list-card';
import TabSelect from '../tab-select';
import { TvShowListResponse } from '@/types/tmdb/tv';

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
];

export default function TvShowsList({
  data,
  tab,
  page,
}: {
  tab: string;
  page: number;
  data: TvShowListResponse | null | undefined;
}) {
  return (
    <div className='flex flex-col items-center justify-between h-full w-full gap-4 sm:gap-8'>
      <TabSelect tabs={TABS} />
      <VodPagination
        baseUrl={`/tv?tab=${tab}`}
        paramPrefix='&'
        currentPage={page}
        totalPages={data?.total_pages}
      />
      <div className='flex flex-wrap justify-center gap-4'>
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
