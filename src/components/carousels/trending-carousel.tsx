import CarouselCards, { CarouselCardInfo } from './carousel-cards';
import { ITmdbListResponseItem } from '@/services/tmdb';

export default async function TrendingCarousel({
  list,
}: {
  list: ITmdbListResponseItem[] | undefined;
}) {
  const data = list?.map((item) => ({
    id: item.id,
    title: item.title ?? item.name,
    imgUrl: item.poster_path
      ? `${process.env.TMDB_IMAGE_URL}${item.poster_path}`
      : '',
    url: `/${item.media_type === 'movie' ? 'movies' : 'tv'}/${item.id}`,
    type: item.media_type,
  })) as CarouselCardInfo[];

  return (
    <section className='flex flex-col gap-2 w-full z-0'>
      <h2 className='text-base md:text-xl font-bold text-secondary-foreground'>
        Trending Now
      </h2>
      <CarouselCards data={data} loading={false} />
    </section>
  );
}
