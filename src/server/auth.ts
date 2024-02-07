import NextAuth from 'next-auth'
import { type DefaultSession, type Session } from 'next-auth'
import { type AdapterUser } from '@auth/core/adapters'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

import { env } from '@/env'
import { db } from '@/server/db'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  callbacks: {
    session: (_params) => {
      // next-auth types are a bit off
      const params = _params as {
        session: Session
        user: AdapterUser
      }

      return {
        ...params.session,
        user: {
          ...params.user,
          id: params.user.id,
        },
      }
    },
  },
  adapter: DrizzleAdapter(db),
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
})

export const getServerAuthSession = (): Promise<Session | null> => auth()
