export type VidSrcType = 'movie' | 'tv';

export interface LatestItem {
  type: VidSrcType;
  title: string;
  imdb_id: string;
  embed_url_imdb: string;
  tmdb_id: string;
  embed_url_tmdb: string;
}

export interface LatestItemsListResponse {
  status: number;
  result: LatestItem[];
}
