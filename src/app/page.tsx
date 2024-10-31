import GenreMoviesCarousel from '@/components/carousels/genre-movies-carousel';
import CompanyTvCarousel from '@/components/carousels/company-tv-carousel';
import TrendingCarousel from '@/components/carousels/trending-carousel';
import PopularMoviesCarousel from '@/components/carousels/popular-movies-carousel';
import Hero from '@/components/hero';
import { getTrendingList } from '@/services/tmdb';

export const dynamic = true;

export default async function Home() {
  const trendingRes = await getTrendingList();
  const trendingList = trendingRes?.results.filter(
    (item) => item.vote_average > 7
  );

  return (
    <div className='flex flex-col items-center pl-[4vw] pb-10 gap-[4vw]'>
      <Hero list={trendingList} />
      <TrendingCarousel list={trendingList} />
      <GenreMoviesCarousel genre='Comedy' />
      <CompanyTvCarousel company='Apple' />
      <PopularMoviesCarousel />
      <CompanyTvCarousel company='Netflix' />
    </div>
  );
}
