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

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [
    trendingRes,
    popularMoviesListRes,
    comedyListRes,
    appleTvListRes,
    netflixTvListRes,
  ] = await Promise.allSettled([
    getTrendingList(),
    getPopularMovies(),
    getMoviesByGenreId(GENRES['Comedy']),
    getTvShowsByCompanyId(COMPANIES['Apple']),
    getTvShowsByCompanyId(COMPANIES['Netflix']),
  ]);
  return (
    <div className='flex flex-col items-center pl-[4vw] pb-10 gap-[4vw]'>
      {trendingRes.status === 'fulfilled' && (
        <>
          <Hero data={trendingRes.value} />
          <TrendingCarousel data={trendingRes.value} />
        </>
      )}
      {comedyListRes.status === 'fulfilled' && (
        <GenreMoviesCarousel data={comedyListRes.value} />
      )}
      {appleTvListRes.status === 'fulfilled' && (
        <CompanyTvCarousel company='Apple' data={appleTvListRes.value} />
      )}
      {popularMoviesListRes.status === 'fulfilled' && (
        <PopularMoviesCarousel data={popularMoviesListRes.value} />
      )}
      {netflixTvListRes.status === 'fulfilled' && (
        <CompanyTvCarousel company='Netflix' data={netflixTvListRes.value} />
      )}
    </div>
  );
}
