import CarouselCards, { CarouselCardInfo } from './carousel-cards';
import { ITmdbListResponseShort } from '@/services/tmdb';

export const GENRES = {
  Comedy: '35',
};

export default function GenreMoviesCarousel({
  data,
}: {
  data: ITmdbListResponseShort | null;
}) {
  const list = data?.results.map((item) => ({
    id: item.id,
    title: item.title,
    imgUrl: item.poster_path
      ? `${process.env.TMDB_IMAGE_URL}${item.poster_path}`
      : '',
    url: `/movie/${item.id}`,
    type: 'movie',
  })) as CarouselCardInfo[];

  return (
    <section className='flex flex-col gap-2 w-full'>
      <h2 className='text-base md:text-xl font-bold text-secondary-foreground'>
        Comedy Movies
      </h2>
      <CarouselCards data={list} loading={false} />
    </section>
  );
}
