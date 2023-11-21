import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { db } from '@/server/db'
import { users } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

export const appRouter = createTRPCRouter({
  getUsers: publicProcedure.query(() => {
    return db.query.users.findMany()
  }),
  addUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      await db.insert(users).values({ name: input.name })
    }),
  deleteUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(users).where(eq(users.id, input.id))
    }),
})

export type AppRouter = typeof appRouter
