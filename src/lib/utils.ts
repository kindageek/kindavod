import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrlPrefix() {
  if (typeof window !== 'undefined') return '';
  const protocol =
    process.env.NODE_ENV === 'development' ? 'http://' : 'https://';

  return `${protocol}${process.env.NEXT_PUBLIC_VERCEL_URL}`;
}

export const isFulfilled = <T>(
  p: PromiseSettledResult<T>
): p is PromiseFulfilledResult<T> => p.status === 'fulfilled';

export const isRejected = <T>(
  p: PromiseSettledResult<T>
): p is PromiseRejectedResult => p.status === 'rejected';
