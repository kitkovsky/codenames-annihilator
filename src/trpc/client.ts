import { createTRPCReact } from '@trpc/react-query'

import { type AppRouter } from '@/server/api/routers/users'

export const trpc = createTRPCReact<AppRouter>()
