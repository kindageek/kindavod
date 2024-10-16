'use client';
import { getSearchResult } from '@/services/tmdb';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import VodPagination from '../vod-pagination';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { SearchResultItem } from '@/types/tmdb/search';
import { Clapperboard, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import useCardIndicator from '@/hooks/useCardIndicator';
import CardPlayerIndicator from '../card-player-indicator';

export default function SearchResultCard({ item }: { item: SearchResultItem }) {
  const data = useMemo(() => {
    if (item.media_type === 'person') {
      return {
        id: item.id,
        url: '',
        disabled: true,
        title: item.name,
        description: item.known_for_department,
        imgUrl: item.profile_path
          ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${item.profile_path}`
          : null,
      };
    }
    if (item.media_type === 'movie') {
      return {
        id: item.id,
        url: `/movie/${item.id}`,
        title: item.title,
        description: new Date(item.release_date).getFullYear(),
        imgUrl: item.poster_path
          ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${item.poster_path}`
          : null,
      };
    }
    return {
      id: item.id,
      url: `/tv/${item.id}`,
      title: item.name,
      description: new Date(item.first_air_date).getFullYear(),
      imgUrl: item.poster_path
        ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${item.poster_path}`
        : null,
    };
  }, [item]);

  const { indicatorStatus, handleCardHover, isHovering, handleCardUnhover } =
    useCardIndicator({
      id: item.id,
      type: item.media_type as 'movie' | 'tv',
    });

  return (
    <Link
      onMouseOver={handleCardHover}
      onMouseLeave={handleCardUnhover}
      key={data.id}
      href={data.url}
      aria-disabled={data?.disabled}
      className={cn(
        'flex flex-col items-center gap-2 relative hover:opacity-75 hover:scale-[1.025] transition-all duration-300 ease-in-out',
        {
          'pointer-events-none': data?.disabled,
        }
      )}
    >
      <div className='w-36 sm:w-40 md:w-48 lg:w-60 aspect-[2/3]'>
        {data.imgUrl ? (
          <Image
            fill
            style={{ objectFit: 'cover' }}
            className='rounded'
            src={data.imgUrl}
            alt={data.title}
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center rounded bg-gray-400'>
            {item.media_type === 'person' ? (
              <UserRound size={36} />
            ) : (
              <Clapperboard size={36} />
            )}
          </div>
        )}
      </div>
      <div className='flex flex-col text-center absolute bottom-0 backdrop-blur-[1px] w-full p-0.5 bg-gradient-to-b from-transparent to-slate-900 rounded-b'>
        <h2 className='text-xs sm:text-sm font-bold'>{data.title}</h2>
        <p className='text-xs'>{data.description}</p>
      </div>
      {item.media_type !== 'person' && (
        <CardPlayerIndicator
          type={item.media_type}
          size={24}
          status={indicatorStatus}
          className={cn('absolute top-1 right-1', { hidden: !isHovering })}
        />
      )}
    </Link>
  );
}
