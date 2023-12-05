import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core'

import { users } from '@/server/db/schema/users'
import { defaultCreatedAt } from '@/server/db/utils'
import { connectors } from '@/server/db/schema/connectors'

export const prompts = sqliteTable(
  'prompts',
  {
    id: integer('id').primaryKey(),
    authorId: text('author_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: text('created_at').default(defaultCreatedAt).notNull(),
  },
  (table) => ({
    authorIdIndex: index('author_id_index').on(table.authorId),
  }),
)

export const promptWords = sqliteTable(
  'prompt_words',
  {
    id: integer('id').primaryKey(),
    promptId: integer('prompt_id')
      .references(() => prompts.id, { onDelete: 'cascade' })
      .notNull(),
    word: text('word').notNull(),
  },
  (table) => ({
    promptIdIndex: index('prompt_id_index').on(table.promptId),
  }),
)
