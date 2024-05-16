'use client';

import Link from 'next/link';
import { Info } from 'lucide-react';

export default function VideoPlayer({
  id,
  type,
}: {
  id: string;
  type: 'movie' | 'tv';
}) {
  return (
    <section className='flex flex-col items-center w-full gap-4'>
      <iframe
        allowFullScreen
        src={`${process.env.NEXT_PUBLIC_VIDSRC_URL}/embed/${type}/${id}`}
        className='w-full aspect-video object-cover rounded'
      />
      <div className='flex items-center justify-center gap-1 text-center text-sm text-gray-500 hover:text-white w-full'>
        <Info size={14} />
        Tip: use{' '}
        <Link
          href='https://getadblock.com/en/'
          className='underline hover:text-white'
        >
          AdBlock
        </Link>{' '}
        to avoid ads on the video player
      </div>
    </section>
  );
}
