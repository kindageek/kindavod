import Image from 'next/image';
import TmdbLogo from '@/assets/logos/tmdb.svg';

export default function Footer() {
  return (
    <footer className='w-screen'>
      <div className='container py-4 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-slate-50/50'>
        <div className='flex flex-col gap-2 text-center md:text-left'>
          <p>© {new Date().getFullYear()} KindaVOD</p>
        </div>
        <div className='flex items-center gap-1'>
          <Image src={TmdbLogo.src} width={32} height={32} alt='TMDB Logo' />
          <p className='text-[8px] text-slate-50/25 block w-44 leading-none'>
            This website uses TMDB and the TMDB APIs but is not endorsed,
            certified, or otherwise approved by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
