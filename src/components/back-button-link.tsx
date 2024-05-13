'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function BackButtonLink() {
  const router = useRouter();
  return (
    <Button variant='link' onClick={() => router.back()}>
      Back
    </Button>
  );
}
