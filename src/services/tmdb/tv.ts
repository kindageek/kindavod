import { getBaseUrlPrefix } from '@/lib/utils';
import { TvShowDetails, TvShowListResponse } from '@/types/tmdb/tv';

export async function getTvShows(params: {
  page: number;
  category: string;
}): Promise<TvShowListResponse | null> {
  try {
    const res = await fetch(
      `${getBaseUrlPrefix()}/api/tmdb/tv?category=${params.category}&page=${
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

export async function getTvShowDetailsById(
  tvShowId: string
): Promise<TvShowDetails | null> {
  try {
    if (!tvShowId) return null;

    const res = await fetch(`${getBaseUrlPrefix()}/api/tmdb/tv/${tvShowId}`);
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
