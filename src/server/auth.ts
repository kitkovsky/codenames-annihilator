import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { eq, and } from 'drizzle-orm'
import type { Adapter } from 'next-auth/adapters'

import { env } from '@/env'
import { db } from '@/server/db'
import { users } from '@/server/db/schema/users'
import { accounts } from '@/server/db/schema/auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

// next-auth drizzle adapter doesn't support async sqlite clients (like turso's libsql),
// which caused errors on consecutive logins, so this is a workaround
// https://github.com/nextauthjs/next-auth/issues/8377#issuecomment-1694720111
const AsyncDrizzleAdapter: Adapter = {
  ...DrizzleAdapter(db),
  async getUserByAccount(providerAccountId) {
    const results = await db
      .select()
      .from(accounts)
      .leftJoin(users, eq(users.id, accounts.userId))
      .where(
        and(
          eq(accounts.provider, providerAccountId.provider),
          eq(accounts.providerAccountId, providerAccountId.providerAccountId),
        ),
      )
      .get()

    return results?.user ?? null
  },
  async createUser(data) {
    return await db
      .insert(users)
      .values({ ...data, id: crypto.randomUUID() })
      .returning()
      .get()
  },
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: AsyncDrizzleAdapter,
  providers: [
    GoogleProvider({
      clientId: env.OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.OAUTH_GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.OAUTH_GITHUB_CLIENT_ID,
      clientSecret: env.OAUTH_GITHUB_CLIENT_SECRET,
    }),
  ],
  debug: env.NODE_ENV === 'development',
}

export const getServerAuthSession = () => getServerSession(authOptions)

export type Session = Awaited<ReturnType<typeof getServerAuthSession>>
