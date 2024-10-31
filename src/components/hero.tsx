'use client';
import { ITmdbListResponseItem } from '@/services/tmdb';
import { Button } from './ui/button';
import { InfoIcon, PlayIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { formatReleaseDate } from '@/lib/utils';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function Hero({
  list,
}: {
  list: ITmdbListResponseItem[] | undefined;
}) {
  const [randomIndex, setRandomIndex] = useState<number | undefined>(undefined);

  const data = useMemo(() => list?.at(randomIndex || 0), [list, randomIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomIndex(getRandomInt(list?.length || 0));
    }, 10000);
    return () => clearInterval(interval);
  }, [list]);

  if (!data) return null;

  return (
    <section aria-label='Hero' className='w-full'>
      <div className='absolute inset-0 z-0 h-[100vw] w-full sm:h-[56.25vw]'>
        <img
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${data.backdrop_path}`}
          className='-z-40 h-full w-full object-cover absolute inset-0 text-transparent'
          alt='poster'
          fetchPriority='high'
          decoding='async'
        />
        <div className='absolute inset-0'>
          <div className='absolute bottom-[35%] left-[4%] top-0 z-10 flex w-[50%] md:w-[36%] flex-col items-start justify-end gap-2 lg:gap-4'>
            <h1 className='text-lg sm:text-xl lg:text-5xl font-bold'>
              {data.title ?? data.name}
            </h1>
            <div className='flex flex-col items-start gap-1 lg:gap-2'>
              <div className='flex items-center space-x-2 whitespace-nowrap'>
                <p className='text-green-500 text-xs lg:text-sm'>
                  {Math.round(data?.vote_average * 10) ?? '-'}% Match
                </p>
                {data?.release_date && (
                  <p className='text-muted-foreground text-xs lg:text-sm'>
                    {formatReleaseDate(data.release_date)}
                  </p>
                )}
                {data?.first_air_date && (
                  <p className='text-muted-foreground text-xs lg:text-sm'>
                    {formatReleaseDate(data.first_air_date)}
                  </p>
                )}
              </div>
              <div className='hidden md:block'>
                <p className='text-xs sm:text-sm lg:text-base line-clamp-3'>
                  {data.overview}
                </p>
              </div>
            </div>
            <Button asChild className='mt-4'>
              <Link href={`/${data.media_type}/${data.id}`}>
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
