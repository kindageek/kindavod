const DEFAULT_PARAMS = 'language=en-US';
const DEFAULT_REQUEST_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const category = searchParams.get('category');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${category}?${DEFAULT_PARAMS}&page=${page}`,
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
