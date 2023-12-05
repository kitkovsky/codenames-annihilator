import { sql } from 'drizzle-orm'

export const defaultCreatedAt = sql`(strftime('%Y-%m-%d %H:%M:%S', 'now'))`
