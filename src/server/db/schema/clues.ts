import { relations } from 'drizzle-orm'
import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core'

import { prompts } from '@/server/db/schema/prompts'
import { defaultCreatedAt } from '@/server/db/utils'

export type Clue = typeof clues.$inferSelect
export type ClueWord = typeof clueWords.$inferSelect
export type ClueWithClueWords = Clue & {
  clueWords: ClueWord[]
}

export const clues = sqliteTable('clues', {
  id: integer('id').primaryKey(),
  promptId: integer('prompt_id')
    .references(() => prompts.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  createdAt: text('created_at').default(defaultCreatedAt).notNull(),
})

export const cluesRelations = relations(clues, ({ one, many }) => ({
  prompt: one(prompts, {
    fields: [clues.promptId],
    references: [prompts.id],
  }),
  clueWords: many(clueWords),
}))

export const clueWords = sqliteTable(
  'clue_words',
  {
    id: integer('id').primaryKey(),
    clueId: integer('clue_id')
      .references(() => clues.id, { onDelete: 'cascade' })
      .notNull(),
    word: text('word').notNull(),
  },
  (table) => ({
    clueIdIndex: index('clue_id_index').on(table.clueId),
  }),
)

export const clueWordsRelations = relations(clueWords, ({ one }) => ({
  clue: one(clues, {
    fields: [clueWords.clueId],
    references: [clues.id],
  }),
}))
