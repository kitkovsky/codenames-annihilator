import { relations } from 'drizzle-orm'
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

import { prompts } from '@/server/db/schema/prompts'
import { defaultCreatedAt } from '@/server/db/utils'

type User = typeof users.$inferSelect
export type AuthUser = Omit<User, 'createdAt'>
export type NewUser = typeof users.$inferInsert

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
  ghostUser: integer('ghost_user', { mode: 'boolean' })
    .notNull()
    .default(false),
  createdAt: text('created_at').default(defaultCreatedAt).notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  prompts: many(prompts),
}))
