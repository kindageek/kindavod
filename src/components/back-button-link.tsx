'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButtonLink() {
  const router = useRouter();
  return (
    <Button variant='link' onClick={() => router.back()}>
      <ChevronLeftIcon size={16} />
      Back
    </Button>
  );
}
