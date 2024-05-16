export type TMDBMediaType = 'movie' | 'tv' | 'person';

export interface SearchResultMovieItem {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  media_type: 'movie';
}

export interface SearchResultTVShowItem {
  id: number;
  name: string;
  poster_path: string;
  genre_ids: number[];
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  popularity: number;
  media_type: 'tv';
}

export interface SearchResultPersonItem {
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
  adult: boolean;
  gender: number;
  known_for_department: string;
  popularity: number;
  known_for: SearchResultMovieItem[] | SearchResultTVShowItem[];
  media_type: 'person';
}

export type SearchResultItem =
  | SearchResultMovieItem
  | SearchResultTVShowItem
  | SearchResultPersonItem;

export interface SearchResult {
  page: number;
  total_results: number;
  total_pages: number;
  results: SearchResultItem[];
}
