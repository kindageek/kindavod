import CarouselCards, { CarouselCardInfo } from './carousel-cards';
import { ITmdbTrendingListResponse } from '@/services/tmdb';

export default function TrendingCarousel({
  data,
}: {
  data: ITmdbTrendingListResponse | null;
}) {
  const list = data?.results
    ?.filter((item) => item.vote_average > 7)
    .map((item) => ({
      id: item.id,
      title: item.media_type === 'movie' ? item.title : item.name,
      imgUrl: item.poster_path
        ? `${process.env.TMDB_IMAGE_URL}${item.poster_path}`
        : '',
      url: `/${item.media_type}/${item.id}`,
      type: item.media_type,
    })) as CarouselCardInfo[];

  return (
    <section className='flex flex-col gap-2 w-full z-0'>
      <h2 className='text-base md:text-xl font-bold text-secondary-foreground'>
        Trending Now
      </h2>
      <CarouselCards data={list} loading={false} />
    </section>
  );
}
