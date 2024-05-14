'use client';

export default function VideoPlayer({ id }: { id: string }) {
  return (
    <iframe
      allowFullScreen
      src={`${process.env.NEXT_PUBLIC_VIDSRC_URL}/embed/tv/${id}`}
      className='w-full aspect-video object-cover rounded'
    />
  );
}
