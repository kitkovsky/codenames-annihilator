import type { Config } from 'drizzle-kit'

import { env } from '@/env'

export default {
  schema: './src/server/db/schema.ts',
  driver: 'turso',
  dbCredentials: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
  verbose: true,
  strict: process.env.NODE_ENV === 'development',
} satisfies Config
