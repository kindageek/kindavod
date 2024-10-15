import CarouselCards, { CarouselCardInfo } from './carousel-cards';
import { getTrendingList } from '@/services/tmdb';

export default async function TrendingCarousel() {
  const list = await getTrendingList();
  const data = list?.results.map((item) => ({
    id: item.id,
    title: item.title,
    imgUrl: `${process.env.TMDB_IMAGE_URL}${item.poster_path}`,
    url: `/${item.media_type === 'movie' ? 'movies' : 'tv'}/${item.id}`,
    type: item.media_type,
  })) as CarouselCardInfo[];

  return (
    <section className='flex flex-col gap-2 w-full'>
      <h2 className='text-base md:text-xl font-bold text-secondary-foreground'>
        Trending Now
      </h2>
      <CarouselCards data={data} loading={false} />
    </section>
  );
}
