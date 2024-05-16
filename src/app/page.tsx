import MoviesCarouselTabs from '@/components/movie/movies-carousel-tabs';
import TrendingCarousel from '@/components/trending-carouself';
import TvShowsCarouselTabs from '@/components/tv/tv-carousel-tabs';

export const revalidate = 0;

export default async function Home() {
  return (
    <div className='container flex flex-col items-center p-10 gap-8'>
      <div className='flex flex-col text-center gap-1'>
        <h1 className='text-4xl font-bold'>KindaVOD</h1>
        <h2 className='text-lg'>Video on Demand</h2>
      </div>
      <TrendingCarousel />
      <MoviesCarouselTabs />
      <TvShowsCarouselTabs />
    </div>
  );
}
