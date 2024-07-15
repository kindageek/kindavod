'use client';

import Link from 'next/link';
import { Info } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function VideoPlayer({
  id,
  type,
}: {
  id: string;
  type: 'movie' | 'tv';
}) {
  const searchParams = useSearchParams();
  const season = searchParams.get('s');
  const episode = searchParams.get('ep');

  const videoUrl = useMemo(() => {
    const defaultUrl = `${process.env.NEXT_PUBLIC_VIDSRC_URL}/embed/${type}/${id}`;
    if (type === 'movie') {
      return defaultUrl;
    }
    if (season && episode) {
      return `${defaultUrl}/${season}/${episode}`;
    }
    return defaultUrl;
  }, [id, type, season, episode]);

  return (
    <section className='flex flex-col items-center w-full gap-4'>
      <iframe
        allowFullScreen
        src={videoUrl}
        className='w-full aspect-video object-cover rounded'
      />
      <div className='flex items-center justify-center gap-1 text-center text-sm text-gray-500 hover:text-white w-full'>
        <Info size={14} />
        Tip: use{' '}
        <Link
          href='https://getadblock.com/en/'
          target='_blank'
          className='underline hover:text-white'
        >
          AdBlock
        </Link>{' '}
        to avoid ads on the video player
      </div>
    </section>
  );
}
