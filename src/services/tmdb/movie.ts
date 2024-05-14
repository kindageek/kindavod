import { getBaseUrlPrefix } from '@/lib/utils';
import { MovieDetails, MovieListResponse } from '@/types/tmdb/movie';

export async function getPopularMovies(params: {
  page: number;
}): Promise<MovieListResponse | null> {
  try {
    const res = await fetch(
      `${getBaseUrlPrefix()}/api/tmdb/movie?category=popular&page=${
        params.page
      }`
    );
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMovieDetailsById(
  movieId: string
): Promise<MovieDetails | null> {
  try {
    if (!movieId) return null;
    const res = await fetch(`${getBaseUrlPrefix()}/api/tmdb/movie/${movieId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
