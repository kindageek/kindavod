'use client';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import React from 'react';

const POSTER_SIZES = { width: 250, height: 375 };

export interface CarouselCardInfo {
  id: number;
  title: string;
  imgUrl: string;
  url: string;
  type: 'movie' | 'tv';
}

export default function CarouselCards({
  data,
  loading,
}: {
  data: CarouselCardInfo[];
  loading: boolean;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        slidesToScroll: 'auto',
      }}
      setApi={setApi}
      className='w-full relative'
    >
      <CarouselContent>
        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className='basis-1/8'>
              <div
                className='flex flex-col items-center gap-2'
                style={{
                  width: POSTER_SIZES.width,
                }}
              >
                <Skeleton
                  style={{
                    width: POSTER_SIZES.width,
                    height: POSTER_SIZES.height,
                  }}
                  className='rounded'
                />
              </div>
            </CarouselItem>
          ))}
        {!loading &&
          data.map((item) => (
            <CarouselItem key={item.id} className='basis-1/8'>
              <CarouselCard item={item} />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className='absolute left-0 top-1/2 translate-y-[-50%] border-none bg-transparent rounded-none h-full hover:bg-black/50 opacity-0 hover:opacity-100 transition-all duration-300' />
      <CarouselNext className='absolute right-0 top-1/2 translate-y-[-50%] border-none bg-transparent rounded-none h-full hover:bg-black/50 opacity-0 hover:opacity-100 transition-all duration-300' />
    </Carousel>
  );
}

function CarouselCard({ item }: { item: CarouselCardInfo }) {
  return (
    <Link
      key={item.id}
      href={item.url}
      className='group flex flex-col items-center gap-2 relative w-full h-auto'
      style={{
        width: POSTER_SIZES.width,
        maxWidth: POSTER_SIZES.width,
      }}
    >
      <Image
        width={POSTER_SIZES.width}
        height={POSTER_SIZES.height}
        className='rounded group-hover:opacity-75 group-hover:scale-[1.025] transition-all duration-300 ease-in-out'
        src={item.imgUrl}
        alt={item.title}
      />
    </Link>
  );
}
