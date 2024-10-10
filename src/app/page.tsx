import MoviesCarouselTabs from '@/components/movie/movies-carousel-tabs';
import TrendingCarousel from '@/components/trending-carouself';
import TvShowsCarouselTabs from '@/components/tv/tv-carousel-tabs';

export const revalidate = 0;

export default async function Home() {
  return (
    <div className='flex flex-col items-center px-[4vw] py-10 gap-10'>
      <TrendingCarousel />
      <MoviesCarouselTabs />
      <TvShowsCarouselTabs />
    </div>
  );
}
