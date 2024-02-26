import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

import * as usersSchema from '@/server/db/schema/users'
import * as promptsSchema from '@/server/db/schema/prompts'
import * as cluesSchema from '@/server/db/schema/clues'
import * as flashcardsSchema from '@/server/db/schema/flashcards'
import * as authSchema from '@/server/db/schema/auth'
import { env } from '@/env'

const client = createClient({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
})

export const db = drizzle(client, {
  schema: {
    ...usersSchema,
    ...promptsSchema,
    ...cluesSchema,
    ...flashcardsSchema,
    ...authSchema,
  },
  logger: env.NODE_ENV === 'development',
})
