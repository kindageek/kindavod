import { getBaseUrlPrefix } from '@/lib/utils';
import { MovieDetails, MovieListResponse } from '@/types/tmdb/movie';

export async function getMovies(params: {
  page: number;
  category: string;
}): Promise<MovieListResponse | null> {
  const res = await fetch(
    `${getBaseUrlPrefix()}/api/tmdb/movie?category=${params.category}&page=${
      params.page
    }`
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getMovieDetailsById(
  movieId: string
): Promise<MovieDetails | null> {
  if (!movieId) throw new Error('Invalid ID');

  const res = await fetch(`${getBaseUrlPrefix()}/api/tmdb/movie/${movieId}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getTrendingMovies(params: {
  page: number;
}): Promise<MovieListResponse | null> {
  const res = await fetch(
    `${getBaseUrlPrefix()}/api/tmdb/movie/trending?page=${params.page}`
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
