import CarouselCards, { CarouselCardInfo } from './carousel-cards';
import { ITmdbListResponse } from '@/services/tmdb';

export default function PopularMoviesCarousel({
  data,
}: {
  data: ITmdbListResponse | null;
}) {
  const list = data?.results.map((item) => ({
    id: item.id,
    title: item.title ?? item.name,
    imgUrl: item.poster_path
      ? `${process.env.TMDB_IMAGE_URL}${item.poster_path}`
      : '',
    url: `/${item.media_type === 'movie' ? 'movies' : 'tv'}/${item.id}`,
    type: item.media_type,
  })) as CarouselCardInfo[];

  return (
    <section className='flex flex-col gap-2 w-full'>
      <h2 className='text-base md:text-xl font-bold text-secondary-foreground'>
        Popular Movies
      </h2>
      <CarouselCards data={list} loading={false} />
    </section>
  );
}
