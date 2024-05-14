import { Metadata } from 'next';
import TvShowsList from './tv-shows-list';

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
    <div className='container flex flex-col items-center p-5 gap-8'>
      <TvShowsList />
    </div>
  );
}
