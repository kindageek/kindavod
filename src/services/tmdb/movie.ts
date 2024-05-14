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

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
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
    console.log(
      `Fetching movie details for ${movieId}: ${`${getBaseUrlPrefix()}/api/tmdb/movie/${movieId}`}`
    );
    const res = await fetch(`${getBaseUrlPrefix()}/api/tmdb/movie/${movieId}`);
    console.log(`Response status: ${res.status}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    console.log(`Data: ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
