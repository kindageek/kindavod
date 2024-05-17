'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clapperboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TvShowShortInfo } from '@/types/tmdb/tv';
import useCardIndicator from '@/hooks/useCardIndicator';
import CardPlayerIndicator from '../card-player-indicator';

export default function TvShowListCard({ item }: { item: TvShowShortInfo }) {
  const data = useMemo(() => {
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
      type: 'tv',
    });

  return (
    <Link
      onMouseOver={handleCardHover}
      onMouseLeave={handleCardUnhover}
      key={data.id}
      href={data.url}
      className={cn(
        'flex flex-col items-center gap-2 relative hover:opacity-75 hover:scale-[1.025] transition-all duration-300 ease-in-out'
      )}
    >
      <div className='w-32 sm:w-40 md:w-48 lg:w-60 aspect-[2/3]'>
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
            <Clapperboard size={36} />
          </div>
        )}
      </div>
      <div className='flex flex-col text-center absolute bottom-0 backdrop-blur-[1px] w-full p-0.5 bg-gradient-to-b from-transparent to-slate-900 rounded-b'>
        <h2 className='text-xs sm:text-sm font-bold'>{data.title}</h2>
        <p className='text-xs'>{data.description}</p>
      </div>
      <CardPlayerIndicator
        type='tv'
        size={24}
        status={indicatorStatus}
        className={cn('absolute top-1 right-1', { hidden: !isHovering })}
      />
    </Link>
  );
}
