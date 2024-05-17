import MoviesCarouselTabs from '@/components/movie/movies-carousel-tabs';
import TrendingCarousel from '@/components/trending-carouself';
import TvShowsCarouselTabs from '@/components/tv/tv-carousel-tabs';

export const revalidate = 0;

export default async function Home() {
  return (
    <div className='container flex flex-col items-center py-4 md:py-10 gap-4 sm:gap-8 max-md:px-4'>
      <div className='flex flex-col text-center gap-1'>
        <h1 className='text-2xl md:text-4xl font-bold'>KindaVOD</h1>
        <h2 className='text-base md:text-lg'>Video on Demand</h2>
      </div>
      <TrendingCarousel />
      <MoviesCarouselTabs />
      <TvShowsCarouselTabs />
    </div>
  );
}
