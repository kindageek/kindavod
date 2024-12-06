import VodPagination from '@/components/vod-pagination';
import MovieListCard from './movie-list-card';
import TabSelect from '../tab-select';
import { MovieListResponse } from '@/types/tmdb/movie';

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
];

export default function MoviesList({
  data,
  tab,
  page,
}: {
  tab: string;
  page: number;
  data: MovieListResponse | null | undefined;
}) {
  return (
    <div className='flex flex-col items-center justify-between h-full w-full gap-4 sm:gap-8'>
      <TabSelect tabs={TABS} />
      <VodPagination
        baseUrl={`/movie?tab=${tab}`}
        paramPrefix='&'
        currentPage={page}
        totalPages={data?.total_pages}
      />
      <div className='flex flex-wrap justify-center gap-4'>
        {data &&
          data.results.map((movie) => (
            <MovieListCard key={movie.id} item={movie} />
          ))}
      </div>
      <VodPagination
        baseUrl={`/movie?tab=${tab}`}
        paramPrefix='&'
        currentPage={page}
        totalPages={data?.total_pages}
      />
    </div>
  );
}
