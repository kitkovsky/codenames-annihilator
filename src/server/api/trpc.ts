import { initTRPC } from '@trpc/server'

const t = initTRPC.create()

export const publicProcedure = t.procedure
export const createTRPCRouter = t.router
