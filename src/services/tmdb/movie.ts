import { MovieDetails, MovieListResponse } from '@/types/tmdb/movie';
const DEFAULT_PARAMS = 'language=en-US';
const DEFAULT_REQUEST_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export async function getPopularMovies(params: {
  page: number;
}): Promise<MovieListResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/popular?${DEFAULT_PARAMS}&page=${params.page}`,
      {
        ...DEFAULT_REQUEST_OPTIONS,
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

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
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movieId}?${DEFAULT_PARAMS}`,
      {
        ...DEFAULT_REQUEST_OPTIONS,
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
