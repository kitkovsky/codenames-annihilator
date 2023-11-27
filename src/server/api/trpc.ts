import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'

import { db } from '@/server/db'

// supposed to be an async function, even with no awaits
// eslint-disable-next-line @typescript-eslint/require-await
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    ...opts,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const publicProcedure = t.procedure
export const createTRPCRouter = t.router
