import { useMemo } from 'react';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MovieShortInfo } from '@/types/tmdb/movie';

export default function MovieListCard({ item }: { item: MovieShortInfo }) {
  const data = useMemo(() => {
    return {
      id: item.id,
      url: `/movie/${item.id}`,
      title: item.title,
      description: new Date(item.release_date).getFullYear(),
      imgUrl: item.poster_path
        ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${item.poster_path}`
        : null,
    };
  }, [item]);

  return (
    <Link
      key={data.id}
      href={data.url}
      className={cn(
        'flex flex-col items-center gap-2 relative hover:opacity-75 hover:scale-[1.025] transition-all duration-300 ease-in-out'
      )}
    >
      <div className='w-36 sm:w-40 md:w-48 lg:w-60 aspect-[2/3]'>
        {data.imgUrl ? (
          <img
            loading='lazy'
            decoding='async'
            className='rounded w-full h-full object-cover'
            src={data.imgUrl}
            alt={data.title}
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center rounded bg-gray-400'>
            <Clapperboard size={36} />
          </div>
        )}
      </div>
      <div className='flex flex-col text-center absolute bottom-0 backdrop-blur-[1px] w-full p-0.5 bg-gradient-to-b from-transparent to-slate-900 rounded-b'>
        <h2 className='text-xs sm:text-sm font-bold'>{data.title}</h2>
        <p className='text-xs'>{data.description}</p>
      </div>
    </Link>
  );
}
