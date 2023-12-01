import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

import * as schema from '@/server/db/schema'
import { env } from '@/env'

const client = createClient({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
})

export const db = drizzle(client, {
  schema,
  logger: env.NODE_ENV === 'development',
})
