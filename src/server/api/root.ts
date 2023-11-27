import { usersRouter } from '@/server/api/routers/users'
import { createTRPCRouter } from '@/server/api/trpc'

export const appRouter = createTRPCRouter({
  users: usersRouter,
})

export type AppRouter = typeof appRouter
