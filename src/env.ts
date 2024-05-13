import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    TMDB_API_URL: z.string().url(),
    TMDB_IMAGE_URL: z.string().url(),
    TMDB_API_KEY: z.string().min(1),
    TMDB_API_READ_ACCESS_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_VIDSRC_URL: z.string().url(),
  },
  runtimeEnv: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_API_URL: process.env.NEXT_PUBLIC_TMDB_API_URL,
    TMDB_IMAGE_URL: process.env.NEXT_PUBLIC_TMDB_IMAGE_URL,
    TMDB_API_READ_ACCESS_TOKEN: process.env.TMDB_API_READ_ACCESS_TOKEN,
    NEXT_PUBLIC_VIDSRC_URL: process.env.NEXT_PUBLIC_VIDSRC_URL,
  },
});
