import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DB_URL: z.string().url(),
    DB_AUTH_TOKEN: z.string().min(1),
    NODE_ENV: z.enum(['development', 'preview', 'production']),
  },
  // still needed, even with no client variables
  experimental__runtimeEnv: {},
})
