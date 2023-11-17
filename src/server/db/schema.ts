import { sql } from 'drizzle-orm'
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
})

export const prompts = sqliteTable('prompts', {
  id: integer('id').primaryKey(),
  userId: integer('author_id')
    .references(() => users.id)
    .notNull(),
  prompt: text('prompt').notNull(),
  createdAt: text('created_at')
    .default(sql`datetime('now')`)
    .notNull(),
})

export const connectors = sqliteTable('connectors', {
  id: integer('id').primaryKey(),
  promptId: integer('prompt_id')
    .references(() => prompts.id)
    .notNull()
    .unique(),
  connectors: text('connectors').notNull(),
  createdAt: text('created_at')
    .default(sql`datetime('now')`)
    .notNull(),
})
