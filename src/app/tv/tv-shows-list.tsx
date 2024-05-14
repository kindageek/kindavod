'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { getTvShows } from '@/services/tmdb/tv';

export default function TvShowsList() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { data, isFetching } = useQuery({
    queryKey: ['tvShows', page],
    queryFn: () => getTvShows({ page }),
    placeholderData: keepPreviousData,
  });
  console.log(data);
  return (
    <div className='flex flex-col items-center justify-between h-full w-full gap-8'>
      <TvShowsListPagination currentPage={page} />
      <div className='flex flex-wrap justify-center gap-4'>
        {isFetching &&
          Array.from({ length: 20 }).map((_, index) => (
            <Skeleton
              key={index}
              className='w-32 sm:w-40 md:w-48 lg:w-60 aspect-[2/3]'
            />
          ))}
        {data &&
          data.results.map((item) => (
            <Link
              key={item.id}
              href={`/tv/${item.id}`}
              className='flex flex-col items-center gap-2 relative hover:opacity-75 hover:scale-[1.025] transition-all duration-300 ease-in-out'
            >
              <div className='w-32 sm:w-40 md:w-48 lg:w-60 aspect-[2/3]'>
                <Image
                  fill
                  objectFit='cover'
                  className='rounded'
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${item.poster_path}`}
                  alt={item.name}
                />
              </div>
              <div className='flex flex-col text-center absolute bottom-0 backdrop-blur-[1px] w-full p-0.5 bg-gradient-to-b from-transparent to-slate-900 rounded-b'>
                <h2 className='text-xs sm:text-sm font-bold'>{item.name}</h2>
                <p className='text-xs'>
                  {new Date(item.first_air_date).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
      </div>
      <TvShowsListPagination currentPage={page} />
    </div>
  );
}

function TvShowsListPagination({ currentPage }: { currentPage: number }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined
            }
            href={`/tv?page=${currentPage - 1}`}
          />
        </PaginationItem>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={`/tv?page=${currentPage - 1}`}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive href='#'>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`/tv?page=${currentPage + 1}`}>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        {currentPage <= 1 && (
          <PaginationItem>
            <PaginationLink href={`/tv?page=${currentPage + 2}`}>
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href={`/tv?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
