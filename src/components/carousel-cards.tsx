'use client';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';
import CardPlayerIndicator from './card-player-indicator';
import { useState } from 'react';
import useCardIndicator from '@/hooks/useCardIndicator';
import { cn } from '@/lib/utils';

const POSTER_SIZES = { width: 144, height: 216 };

export interface CarouselCardInfo {
  id: number;
  title: string;
  date: string;
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
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
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
                <div className='w-full flex flex-col text-center p-0.5 gap-1'>
                  <Skeleton className='w-full h-4' />
                  <Skeleton className='w-full h-4' />
                </div>
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function CarouselCard({ item }: { item: CarouselCardInfo }) {
  const { indicatorStatus, handleCardHover, isHovering, handleCardUnhover } =
    useCardIndicator({
      id: item.id,
      type: item.type,
    });

  return (
    <Link
      onMouseOver={handleCardHover}
      onMouseLeave={handleCardUnhover}
      key={item.id}
      href={item.url}
      className='group flex flex-col items-center gap-2 relative'
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
      <div
        className='flex flex-col text-center p-0.5'
        style={{
          width: POSTER_SIZES.width,
        }}
      >
        <p className='text-xs font-bold'>{item.title}</p>
        <p className='text-xs'>{item.date}</p>
      </div>
      <CardPlayerIndicator
        type={item.type}
        status={indicatorStatus}
        className={cn('absolute top-1 right-1', { hidden: !isHovering })}
      />
    </Link>
  );
}
