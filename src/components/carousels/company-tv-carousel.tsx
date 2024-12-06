import CarouselCards, { CarouselCardInfo } from './carousel-cards';
import { ITmdbListResponseShort } from '@/services/tmdb';

export const COMPANIES = {
  Apple: '194232',
  Netflix: '178464',
} as const;

export default function CompanyTvCarousel({
  data,
  company,
}: {
  data: ITmdbListResponseShort | null;
  company: string;
}) {
  const list = data?.results.map((item) => ({
    id: item.id,
    title: item.title,
    imgUrl: item?.poster_path
      ? `${process.env.TMDB_IMAGE_URL}${item.poster_path}`
      : '',
    url: `/tv/${item.id}`,
    type: 'tv',
  })) as CarouselCardInfo[];

  return (
    <section className='flex flex-col gap-2 w-full'>
      <h2 className='text-base md:text-xl font-bold text-secondary-foreground'>
        {company} TV Shows
      </h2>
      <CarouselCards data={list} loading={false} />
    </section>
  );
}
