const DEFAULT_PARAMS = {
  language: 'en-US',
  include_adult: 'false',
};
const DEFAULT_REQUEST_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    accept: 'application/json',
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';
  const type = searchParams.get('type') || 'multi';

  const urlParams = new URLSearchParams({
    ...DEFAULT_PARAMS,
    page,
    query,
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/${type}?${urlParams}`,
    {
      ...DEFAULT_REQUEST_OPTIONS,
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return Response.json(data);
}
