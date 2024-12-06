import { LoaderCircle } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className='container flex-1 flex flex-col items-center justify-center py-4 md:py-10 gap-4 sm:gap-8 max-md:px-4'>
      <LoaderCircle size={64} className='animate-spin' />
    </div>
  );
}
