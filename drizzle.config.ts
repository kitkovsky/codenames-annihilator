import type { Config } from 'drizzle-kit'

export default {
  schema: './db/schema.ts',
  driver: 'turso',
  dbCredentials: {
    url: process.env['DB_URL']!,
    authToken: process.env['DB_AUTH_TOKEN']!,
  },
  verbose: true,
  strict: true,
} satisfies Config
