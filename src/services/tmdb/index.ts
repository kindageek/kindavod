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
