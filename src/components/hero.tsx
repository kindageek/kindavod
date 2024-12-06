'use client';
import { ITmdbTrendingListResponse } from '@/services/tmdb';
import { Button } from './ui/button';
import { InfoIcon, PlayIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { formatReleaseDate } from '@/lib/utils';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function Hero({
  data,
}: {
  data: ITmdbTrendingListResponse | null;
}) {
  const [randomIndex, setRandomIndex] = useState<number | undefined>(undefined);
  const list = useMemo(
    () => data?.results?.filter((item) => item.vote_average > 7) ?? [],
    [data]
  );

  const item = useMemo(() => list.at(randomIndex || 0), [list, randomIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomIndex(getRandomInt(list?.length || 0));
    }, 10000);
    return () => clearInterval(interval);
  }, [list]);

  if (!item) return null;

  return (
    <section aria-label='Hero' className='w-full'>
      <div className='absolute inset-0 z-0 h-[100vw] w-full sm:h-[56.25vw]'>
        <img
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${item.backdrop_path}`}
          className='-z-40 h-full w-full object-cover absolute inset-0 text-transparent'
          alt='poster'
          fetchPriority='high'
          decoding='async'
        />
        <div className='absolute inset-0'>
          <div className='absolute bottom-[35%] left-[4%] top-0 z-10 flex w-[50%] md:w-[36%] flex-col items-start justify-end gap-2 lg:gap-4'>
            <h1 className='text-lg sm:text-xl lg:text-5xl font-bold'>
              {item.media_type === 'tv' ? item.name : item.title}
            </h1>
            <div className='flex flex-col items-start gap-1 lg:gap-2'>
              <div className='flex items-center space-x-2 whitespace-nowrap'>
                <p className='text-green-500 text-xs lg:text-sm'>
                  {Math.round(item?.vote_average * 10) ?? '-'}% Match
                </p>
                {item.media_type === 'movie' && (
                  <p className='text-muted-foreground text-xs lg:text-sm'>
                    {formatReleaseDate(item.release_date)}
                  </p>
                )}
                {item.media_type === 'tv' && (
                  <p className='text-muted-foreground text-xs lg:text-sm'>
                    {formatReleaseDate(item.first_air_date)}
                  </p>
                )}
              </div>
              <div className='hidden md:block'>
                <p className='text-xs sm:text-sm lg:text-base line-clamp-3'>
                  {item.overview}
                </p>
              </div>
            </div>
            <Button asChild className='mt-4'>
              <Link href={`/${item.media_type}/${item.id}`}>
                <InfoIcon className='size-5 mr-2' />
                More info
              </Link>
            </Button>
          </div>
        </div>
        <div className='opacity-71 absolute inset-0 right-[26.09%] z-[8] bg-gradient-to-r from-secondary to-85%'></div>
        <div className='absolute bottom-[-1px] left-0 right-0 z-[8] h-[14.7vw] bg-gradient-to-b from-background/0 from-30% via-background/30 via-50% to-background to-80%'></div>
      </div>
      <div className='relative inset-0 -z-50 mb-5 pb-[60%] sm:pb-[40%]'></div>
    </section>
  );
}
