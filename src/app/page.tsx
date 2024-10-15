import GenreMoviesCarousel from '@/components/carousels/genre-movies-carousel';
import CompanyTvCarousel from '@/components/carousels/company-tv-carousel';
import TrendingCarousel from '@/components/carousels/trending-carousel';
import PopularMoviesCarousel from '@/components/carousels/popular-movies-carousel';

export const revalidate = 0;

export default async function Home() {
  return (
    <div className=' flex flex-col items-center px-[4vw] py-10 gap-10'>
      <TrendingCarousel />
      <GenreMoviesCarousel genre='Comedy' />
      <CompanyTvCarousel company='Apple' />
      <PopularMoviesCarousel />
      <CompanyTvCarousel company='Netflix' />
    </div>
  );
}
