'use client';

export default function VideoPlayer({ movieId }: { movieId: string }) {
  return (
    <iframe
      allowFullScreen
      src={`${process.env.NEXT_PUBLIC_VIDSRC_URL}/embed/movie/${movieId}`}
      className='w-full aspect-video object-cover rounded'
    />
  );
}
