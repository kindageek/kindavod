import { DEFAULT_ERROR_MESSAGE, DEFAULT_LANGUAGE } from '@/lib/constants';

const DEFAULT_PARAMS = {
  language: DEFAULT_LANGUAGE,
};
const DEFAULT_REQUEST_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export async function GET(
  request: Request,
  { params }: { params: { tvShowId: string } }
) {
  const tvShowId = params.tvShowId;
  const urlParams = new URLSearchParams({ ...DEFAULT_PARAMS }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/tv/${tvShowId}?${urlParams}`,
    {
      ...DEFAULT_REQUEST_OPTIONS,
    }
  );
  if (!res.ok) {
    throw new Error(res.statusText || DEFAULT_ERROR_MESSAGE);
  }

  const data = await res.json();
  return Response.json(data);
}
