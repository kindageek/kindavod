import { getBaseUrlPrefix } from '@/lib/utils';
import { TvShowDetails, TvShowListResponse } from '@/types/tmdb/tv';

export async function getTvShows(params: {
  page: number;
  category: string;
}): Promise<TvShowListResponse | null> {
  const res = await fetch(
    `${getBaseUrlPrefix()}/api/tmdb/tv?category=${params.category}&page=${
      params.page
    }`
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getTvShowDetailsById(
  tvShowId: string
): Promise<TvShowDetails | null> {
  if (!tvShowId) throw new Error('Invalid ID');
  const res = await fetch(`${getBaseUrlPrefix()}/api/tmdb/tv/${tvShowId}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getTrendingTvShows(params: {
  page: number;
}): Promise<TvShowListResponse | null> {
  const res = await fetch(
    `${getBaseUrlPrefix()}/api/tmdb/tv/trending?page=${params.page}`
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
