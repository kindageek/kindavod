import {
  getLatestMovies,
  getRecentlyAddedMovies,
} from '@/services/vidsrc/movie';
import MoviesCarousel from './movies-carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export default async function MoviesCarouselTabs() {
  const [latestMovies, recentlyAddedMovies] = await Promise.all([
    getLatestMovies(),
    getRecentlyAddedMovies(),
  ]);
  return (
    <div className='flex flex-col gap-4 w-full px-12'>
      <Tabs defaultValue='latest'>
        <div className='flex justify-between items-center gap-4'>
          <h2 className='text-xl font-bold'>Movies</h2>
          <TabsList className='mb-2'>
            <TabsTrigger value='latest'>Latest</TabsTrigger>
            <TabsTrigger value='recent'>Recently Added</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='latest'>
          <MoviesCarousel data={latestMovies} />
        </TabsContent>
        <TabsContent value='recent'>
          <MoviesCarousel data={recentlyAddedMovies} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
