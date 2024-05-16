import { Metadata } from 'next';
import SearchResult from '../../components/search/search-result';

export const metadata: Metadata = {
  title: 'Search | KindaVOD',
  description: 'Video on Demand by @kindadev',
  twitter: {
    title: 'Search | KindaVOD',
    description: 'Video on Demand by @kindadev',
  },
  openGraph: {
    title: 'Search | KindaVOD',
    description: 'Video on Demand by @kindadev',
  },
};

export default async function SearchPage() {
  return (
    <div className='container flex flex-col items-center p-5 gap-8'>
      <SearchResult />
    </div>
  );
}
