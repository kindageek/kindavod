import { Metadata } from 'next';
import TvShowsList from '../../components/tv/tv-shows-list';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'TV Shows | KindaVOD',
  description: 'Video on Demand by @kindadev',
  twitter: {
    title: 'TV Shows | KindaVOD',
    description: 'Video on Demand by @kindadev',
  },
  openGraph: {
    title: 'TV Shows | KindaVOD',
    description: 'Video on Demand by @kindadev',
  },
};

export default function TvShowsPage() {
  return (
    <div className='container flex flex-col items-center py-4 md:py-10 gap-4 sm:gap-8 max-md:px-4'>
      <TvShowsList />
    </div>
  );
}
