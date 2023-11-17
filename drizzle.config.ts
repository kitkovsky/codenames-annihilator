import type { Config } from 'drizzle-kit'
import { env } from './src/env.mjs'

export default {
  schema: './db/schema.ts',
  driver: 'turso',
  dbCredentials: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
} satisfies Config
