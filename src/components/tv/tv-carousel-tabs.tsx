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
    <div className='flex flex-col gap-4 w-full px-12'>
      <Tabs defaultValue='latest'>
        <div className='flex justify-between items-center gap-4'>
          <h2 className='text-xl font-bold'>TV Shows</h2>
          <TabsList className='mb-2'>
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
