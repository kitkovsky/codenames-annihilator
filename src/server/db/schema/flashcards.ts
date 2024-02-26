import { relations } from 'drizzle-orm'
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core'

import { prompts, type PromptWithPromptWords } from '@/server/db/schema/prompts'
import { clues, type ClueWithClueWords } from '@/server/db/schema/clues'
import { users } from '@/server/db/schema/users'
import { defaultCreatedAt } from '@/server/db/utils'

export const FLASHCARD_STATES = [
  'not_practised',
  'fail',
  'hard',
  'good',
  'easy',
] as const

export enum FLASHCARD_STATES_ENUM {
  NOT_PRACTISED = 'not_practised',
  FAIL = 'fail',
  HARD = 'hard',
  GOOD = 'good',
  EASY = 'easy',
}

export type FlashcardInput = typeof flashcards.$inferSelect
export type Flashcard = FlashcardInput & {
  prompt: PromptWithPromptWords
  clue: ClueWithClueWords
}

export const flashcards = sqliteTable('flashcards', {
  id: integer('id').primaryKey(),
  authorId: text('author_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  promptId: integer('prompt_id')
    .references(() => prompts.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  clueId: integer('clue_id')
    .references(() => clues.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  state: text('state', { enum: FLASHCARD_STATES })
    .notNull()
    .default('not_practised'),
  createdAt: text('created_at').default(defaultCreatedAt).notNull(),
})

export const flashcardsRelations = relations(flashcards, ({ one }) => ({
  author: one(users, {
    fields: [flashcards.authorId],
    references: [users.id],
  }),
  prompt: one(prompts, {
    fields: [flashcards.promptId],
    references: [prompts.id],
  }),
  clue: one(clues, {
    fields: [flashcards.clueId],
    references: [clues.id],
  }),
}))
