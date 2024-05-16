import { getBaseUrlPrefix } from '@/lib/utils';
import { MovieDetails, MovieListResponse } from '@/types/tmdb/movie';

export async function getMovies(params: {
  page: number;
  category: string;
}): Promise<MovieListResponse | null> {
  try {
    const res = await fetch(
      `${getBaseUrlPrefix()}/api/tmdb/movie?category=${params.category}&page=${
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

    const res = await fetch(`${getBaseUrlPrefix()}/api/tmdb/movie/${movieId}`);
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

export async function getTrendingMovies(params: {
  page: number;
}): Promise<MovieListResponse | null> {
  try {
    const res = await fetch(
      `${getBaseUrlPrefix()}/api/tmdb/movie/trending?page=${params.page}`
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
