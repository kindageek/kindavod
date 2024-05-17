import { Metadata } from 'next';
import SearchResult from '../../components/search/search-result';
import { Suspense } from 'react';

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
    <div className='container flex flex-col items-center py-4 md:py-10 gap-4 sm:gap-8 max-md:px-4'>
      <Suspense>
        <SearchResult />
      </Suspense>
    </div>
  );
}
