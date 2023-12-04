import { getServerSession, type NextAuthOptions } from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

import { env } from '@/env'
import { db } from '@/server/db'

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.OAUTH_GOOGLE_CLIENT_SECRET,
      // consecutive logins break without this flag ¯\_(ツ)_/¯
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: env.OAUTH_GITHUB_CLIENT_ID,
      clientSecret: env.OAUTH_GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  debug: env.NODE_ENV === 'development',
}

export const getServerAuthSession = () => getServerSession(authOptions)

export type Session = Awaited<ReturnType<typeof getServerAuthSession>>
