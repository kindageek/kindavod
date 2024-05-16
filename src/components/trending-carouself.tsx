'use client';
import { getTrendingMovies } from '@/services/tmdb/movie';
import { getTrendingTvShows } from '@/services/tmdb/tv';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import CarouselCards, { CarouselCardInfo } from './carousel-cards';

export default function TrendingCarousel() {
  const { data: movies, isFetching: isMoviesFetching } = useQuery({
    queryKey: ['trending-movies'],
    queryFn: () => getTrendingMovies({ page: 1 }),
    enabled: true,
    select: (data) => {
      const list = data?.results;
      if (list === undefined || !list?.length) return [];
      return list.map((movie) => ({
        id: movie.id,
        title: movie.title,
        date: new Date(movie.release_date).getFullYear().toString(),
        imgUrl: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${movie.poster_path}`,
        url: `/movie/${movie.id}`,
      })) as CarouselCardInfo[];
    },
  });

  const { data: tvShows, isFetching: isTvShowsFetching } = useQuery({
    queryKey: ['trending-tv-shows'],
    queryFn: () => getTrendingTvShows({ page: 1 }),
    enabled: true,
    select: (data) => {
      const list = data?.results;
      if (list === undefined || !list?.length) return [];
      return data?.results.map((tvShow) => ({
        id: tvShow.id,
        title: tvShow.name,
        date: `${new Date(tvShow.first_air_date).getFullYear().toString()}`,
        imgUrl: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${tvShow.poster_path}`,
        url: `/tv/${tvShow.id}`,
      })) as CarouselCardInfo[];
    },
  });

  return (
    <div className='flex flex-col gap-4 w-full px-12'>
      <h2 className='text-xl font-bold'>Trending</h2>
      <Tabs defaultValue='movies'>
        <TabsList className='mb-2'>
          <TabsTrigger value='movies'>Movies</TabsTrigger>
          <TabsTrigger value='tvShows'>TV Shows</TabsTrigger>
        </TabsList>
        <TabsContent value='movies'>
          <CarouselCards
            data={movies as CarouselCardInfo[]}
            loading={isMoviesFetching}
          />
        </TabsContent>
        <TabsContent value='tvShows'>
          <CarouselCards
            data={tvShows as CarouselCardInfo[]}
            loading={isTvShowsFetching}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
