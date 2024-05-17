import TvShowsCarousel from './tv-carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getLatestTvShows,
  getRecentlyAddedTvShows,
} from '@/services/vidsrc/tv';

export default async function TvShowsCarouselTabs() {
  const [latestMovies, recentlyAddedMovies] = await Promise.all([
    getLatestTvShows(),
    getRecentlyAddedTvShows(),
  ]);
  return (
    <div className='flex flex-col gap-4 w-full px-10 md:px-12'>
      <Tabs defaultValue='latest'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 mb-2'>
          <h2 className='text-base md:text-xl font-bold text-nowrap'>
            TV Shows
          </h2>
          <TabsList>
            <TabsTrigger value='latest'>Latest</TabsTrigger>
            <TabsTrigger value='recent'>Recently Added</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='latest'>
          <TvShowsCarousel data={latestMovies} />
        </TabsContent>
        <TabsContent value='recent'>
          <TvShowsCarousel data={recentlyAddedMovies} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
