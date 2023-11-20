import { sql } from 'drizzle-orm'
import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core'

const defaultCreatedAt = sql`(strftime('%Y-%m-%d %H:%M:%S', 'now'))`

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: text('created_at').default(defaultCreatedAt).notNull(),
})

export const prompts = sqliteTable(
  'prompts',
  {
    id: integer('id').primaryKey(),
    authorId: integer('author_id')
      .references(() => users.id)
      .notNull(),
    prompt: text('prompt').notNull(),
    createdAt: text('created_at').default(defaultCreatedAt).notNull(),
  },
  (table) => {
    return {
      authorIdIndex: index('author_id_index').on(table.authorId),
    }
  },
)

export const connectors = sqliteTable('connectors', {
  id: integer('id').primaryKey(),
  promptId: integer('prompt_id')
    .references(() => prompts.id)
    .notNull()
    .unique(),
  connectors: text('connectors').notNull(),
  createdAt: text('created_at').default(defaultCreatedAt).notNull(),
})
