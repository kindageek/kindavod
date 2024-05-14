import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrlPrefix() {
  return typeof window === 'undefined'
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : '';
}
