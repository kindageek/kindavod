import GenreMoviesCarousel, {
  GENRES,
} from '@/components/carousels/genre-movies-carousel';
import CompanyTvCarousel, {
  COMPANIES,
} from '@/components/carousels/company-tv-carousel';
import TrendingCarousel from '@/components/carousels/trending-carousel';
import PopularMoviesCarousel from '@/components/carousels/popular-movies-carousel';
import Hero from '@/components/hero';
import {
  getMoviesByGenreId,
  getPopularMovies,
  getTrendingList,
  getTvShowsByCompanyId,
} from '@/services/tmdb';

export default async function Home() {
  const [
    trendingRes,
    popularMoviesListRes,
    comedyListRes,
    appleTvListRes,
    netflixTvListRes,
  ] = await Promise.all([
    getTrendingList(),
    getPopularMovies(),
    getMoviesByGenreId(GENRES['Comedy']),
    getTvShowsByCompanyId(COMPANIES['Apple']),
    getTvShowsByCompanyId(COMPANIES['Netflix']),
  ]);
  return (
    <div className='flex flex-col items-center pl-[4vw] pb-10 gap-[4vw]'>
      <Hero data={trendingRes} />
      <TrendingCarousel data={trendingRes} />
      <GenreMoviesCarousel data={comedyListRes} />
      <CompanyTvCarousel company='Apple' data={appleTvListRes} />
      <PopularMoviesCarousel data={popularMoviesListRes} />
      <CompanyTvCarousel company='Netflix' data={netflixTvListRes} />
    </div>
  );
}
