import * as schema from '@/server/db/schema'
import { env } from '@/env.mjs'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

const client = createClient({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })
