import { LatestItemsListResponse } from '@/types/vidsrc';

export async function getLatestTvShows(params?: {
  page: number;
}): Promise<LatestItemsListResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VIDSRC_URL}/vapi/tv/new`
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

export async function getRecentlyAddedTvShows(params?: {
  page: number;
}): Promise<LatestItemsListResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VIDSRC_URL}/vapi/tv/add`
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
