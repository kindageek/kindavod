import { getBaseUrlPrefix } from '@/lib/utils';
import { SearchResult } from '@/types/tmdb/search';

export async function getSearchResult(params: {
  query: string;
  page: number;
}): Promise<SearchResult | null> {
  if (!params.query || !params.page) return null;
  const urlParams = new URLSearchParams({
    ...params,
    page: params.page.toString(),
    type: 'multi',
  }).toString();
  const res = await fetch(`${getBaseUrlPrefix()}/api/tmdb/search?${urlParams}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getMoviesByGenreId(
  genreId: string
): Promise<ITmdbListResponse | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getTvShowsByCompanyId(
  companyId: string
): Promise<ITmdbListResponse | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_companies=${companyId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getTrendingList(): Promise<ITmdbListResponse | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/trending/all/day?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getPopularMovies(): Promise<ITmdbListResponse | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/popular?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export interface ITmdbListResponse {
  page: number;
  results: ITmdbListResponseItem[];
  total_pages: number;
  total_results: number;
}

export interface ITmdbListResponseItem {
  backdrop_path: string;
  id: number;
  title?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: 'movie' | 'tv';
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}
