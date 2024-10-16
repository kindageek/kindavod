'use client';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import React from 'react';
import PosterPlaceholderImage from '@/assets/poster-placeholder.png';
import { cn } from '@/lib/utils';

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
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        slidesToScroll: 'auto',
      }}
      className='w-full relative'
    >
      <CarouselContent className='ml-0'>
        {data.map((item) => (
          <CarouselItem key={item.id} className='basis-1/8 py-0.5 rounded'>
            <CarouselCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={cn(
          'absolute left-0 top-1/2 translate-y-[-50%] border-none rounded-none h-full transition-default',
          'bg-black/20 lg:bg-transparent opacity-100 lg:opacity-0',
          'hover:bg-black/50 hover:opacity-100'
        )}
      />
      <CarouselNext
        className={cn(
          'absolute right-0 top-1/2 translate-y-[-50%] border-none rounded-none h-full transition-default',
          'bg-black/20 lg:bg-transparent opacity-100 lg:opacity-0',
          'hover:bg-black/50 hover:opacity-100'
        )}
      />
    </Carousel>
  );
}

function CarouselCard({ item }: { item: CarouselCardInfo }) {
  return (
    <Link
      key={item.id}
      href={item.url}
      className='group flex flex-col items-center gap-2 relative h-auto rounded w-[130px] md:w-[180px] lg:w-[250px] aspect-[2/3]'
    >
      <img
        className='rounded group-hover:opacity-75 group-hover:scale-[1.01] transition-all duration-300 ease-in-out w-full h-full object-cover'
        src={item.imgUrl || PosterPlaceholderImage.src}
        alt={item.title}
        loading='lazy'
        decoding='async'
      />
    </Link>
  );
}
