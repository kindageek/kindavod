import CarouselCards, { CarouselCardInfo } from './carousel-cards';
import { getTvShowsByCompanyId } from '@/services/tmdb';

const COMPANIES = {
  Apple: '194232',
  Netflix: '178464',
} as const;

type Company = keyof typeof COMPANIES;

export default async function CompanyTvCarousel({
  company,
}: {
  company: Company;
}) {
  const list = await getTvShowsByCompanyId(COMPANIES[company]);
  const data = list?.results.map((item) => ({
    id: item.id,
    title: item.title ?? item.name,
    imgUrl: item?.poster_path
      ? `${process.env.TMDB_IMAGE_URL}${item.poster_path}`
      : '',
    url: `/${item.media_type === 'movie' ? 'movies' : 'tv'}/${item.id}`,
    type: item.media_type,
  })) as CarouselCardInfo[];

  return (
    <section className='flex flex-col gap-2 w-full'>
      <h2 className='text-base md:text-xl font-bold text-secondary-foreground'>
        {company} TV Shows
      </h2>
      <CarouselCards data={data} loading={false} />
    </section>
  );
}
