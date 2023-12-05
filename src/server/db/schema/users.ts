import { relations } from 'drizzle-orm'
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

import { prompts } from '@/server/db/schema/prompts'
import { defaultCreatedAt } from '@/server/db/utils'

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
  createdAt: text('created_at').default(defaultCreatedAt).notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  prompts: many(prompts),
}))
