'use client';

import { env } from '@/env';

export default function VideoPlayer({ movieId }: { movieId: string }) {
  return (
    <iframe
      allowFullScreen
      src={`${env.NEXT_PUBLIC_VIDSRC_URL}/embed/movie/${movieId}`}
      className='w-full max-w-3xl aspect-video object-cover rounded'
    />
  );
}
