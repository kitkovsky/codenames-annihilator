import { relations } from 'drizzle-orm'
import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core'

import { prompts } from '@/server/db/schema/prompts'
import { defaultCreatedAt } from '@/server/db/utils'

export type Connector = typeof connectors.$inferSelect
export type ConnectorWord = typeof connectorWords.$inferSelect
export type ConnectorWithConnectorWords = Connector & {
  connectorWords: ConnectorWord[]
}

export const connectors = sqliteTable('connectors', {
  id: integer('id').primaryKey(),
  promptId: integer('prompt_id')
    .references(() => prompts.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  createdAt: text('created_at').default(defaultCreatedAt).notNull(),
})

export const connectorsRelations = relations(connectors, ({ one, many }) => ({
  prompt: one(prompts, {
    fields: [connectors.promptId],
    references: [prompts.id],
  }),
  connectorWords: many(connectorWords),
}))

export const connectorWords = sqliteTable(
  'connector_words',
  {
    id: integer('id').primaryKey(),
    connectorId: integer('connector_id')
      .references(() => connectors.id, { onDelete: 'cascade' })
      .notNull(),
    word: text('word').notNull(),
  },
  (table) => ({
    connectorIdIndex: index('connector_id_index').on(table.connectorId),
  }),
)

export const connectorWordsRelations = relations(connectorWords, ({ one }) => ({
  connector: one(connectors, {
    fields: [connectorWords.connectorId],
    references: [connectors.id],
  }),
}))
