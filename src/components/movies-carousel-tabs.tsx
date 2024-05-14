import {
  getLatestMovies,
  getRecentlyAddedMovies,
} from '@/services/vidsrc/movie';
import MoviesCarousel from '@/components/movies-carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function MoviesCarouselTabs() {
  const [latestMovies, recentlyAddedMovies] = await Promise.all([
    getLatestMovies(),
    getRecentlyAddedMovies(),
  ]);
  return (
    <Tabs defaultValue='latest' className='w-full'>
      <TabsList>
        <TabsTrigger value='latest'>Latest</TabsTrigger>
        <TabsTrigger value='recent'>Recently Added</TabsTrigger>
      </TabsList>
      <TabsContent value='latest'>
        <MoviesCarousel data={latestMovies} />
      </TabsContent>
      <TabsContent value='recent'>
        <MoviesCarousel data={recentlyAddedMovies} />
      </TabsContent>
    </Tabs>
  );
}
