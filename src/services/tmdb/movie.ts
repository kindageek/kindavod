import { MovieDetails, MovieListResponse } from '@/types/tmdb/movie';
const DEFAULT_PARAMS = 'language=en-US';
const DEFAULT_REQUEST_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export async function getPopularMovies(params: {
  page: number;
}): Promise<MovieListResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/tmdb/movie?category=popular&page=${params.page}`
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/tmdb/movie/${movieId}`
    );
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
