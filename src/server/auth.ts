import NextAuth from 'next-auth'
import { type DefaultSession, type Session } from 'next-auth'
import { type AdapterUser } from '@auth/core/adapters'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { cache } from 'react'

import { env } from '@/env'
import { db } from '@/server/db'
import type { AuthUser } from './db/schema/users'
import { cookies, headers } from 'next/headers'
import { GHOST_USER_ID_COOKIE_NAME } from '@/middleware'

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

type User =
  | {
      type: 'ghost'
      id: string
    }
  | ({
      type: 'user'
    } & AuthUser)

type GetServerCurrentUserReturn = {
  user: User
  isGhostUser: boolean
}

export const getServerCurrentUser = cache(
  async (): Promise<GetServerCurrentUserReturn> => {
    const session = await auth()
    const user = session?.user

    if (user) {
      return {
        user: { type: 'user', ...(user as AuthUser) },
        isGhostUser: false,
      }
    }

    const cookieStore = cookies()
    const cookieGhostUserId = cookieStore.get(GHOST_USER_ID_COOKIE_NAME)?.value
    const headersGhostUserId = headers().get(GHOST_USER_ID_COOKIE_NAME)

    // if the cookie was just set from middleware, it won't be available in the first render pass of a server component,
    // that's why it's set in headers as well
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const ghostUserId = (cookieGhostUserId ?? headersGhostUserId) as string

    return {
      user: {
        type: 'ghost',
        id: ghostUserId,
      },
      isGhostUser: true,
    }
  },
)
