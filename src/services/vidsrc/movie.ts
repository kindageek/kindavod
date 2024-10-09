import { DEFAULT_ERROR_MESSAGE } from '@/lib/constants';
import { LatestItemsListResponse } from '@/types/vidsrc';

export async function getLatestMovies(params?: {
  page: number;
}): Promise<LatestItemsListResponse | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VIDSRC_URL}/movies/latest/page-1.json`
  );
  if (!res.ok) {
    throw new Error(res.statusText || DEFAULT_ERROR_MESSAGE);
  }
  return res.json();
}

export async function getRecentlyAddedMovies(params?: {
  page: number;
}): Promise<LatestItemsListResponse | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VIDSRC_URL}/movies/latest/page-1.json`
  );
  if (!res.ok) {
    throw new Error(res.statusText || DEFAULT_ERROR_MESSAGE);
  }
  return res.json();
}
