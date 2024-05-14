const DEFAULT_PARAMS = {
  language: 'en-US',
};
const DEFAULT_REQUEST_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export async function GET(
  request: Request,
  { params }: { params: { movieId: string } }
) {
  const movieId = params.movieId;
  const urlParams = new URLSearchParams({ ...DEFAULT_PARAMS }).toString();
  console.log(
    `Fetching movie details for ${movieId}: ${`${process.env.TMDB_API_URL}/movie/${movieId}?${urlParams}`}`
  );
  const res = await fetch(
    `${process.env.TMDB_API_URL}/movie/${movieId}?${urlParams}`,
    {
      ...DEFAULT_REQUEST_OPTIONS,
    }
  );
  console.log(`Response status: ${res.status}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  console.log(`Data: ${JSON.stringify(data)}`);
  return Response.json(data);
}
