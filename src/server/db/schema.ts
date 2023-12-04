import { sql } from 'drizzle-orm'
import {
  text,
  integer,
  sqliteTable,
  index,
  primaryKey,
} from 'drizzle-orm/sqlite-core'
import type { AdapterAccount } from '@auth/core/adapters'

const defaultCreatedAt = sql`(strftime('%Y-%m-%d %H:%M:%S', 'now'))`

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

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
  createdAt: text('created_at').default(defaultCreatedAt).notNull(),
})

export const accounts = sqliteTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    refresh_token_expires_in: integer('refresh_token_expires_in'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sessions = sqliteTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
})

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)
