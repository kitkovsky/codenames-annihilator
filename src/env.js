import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DB_URL: z.string().url(),
    DB_AUTH_TOKEN: z.string().min(1),

    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(32),

    OAUTH_GITHUB_CLIENT_ID: z.string(),
    OAUTH_GITHUB_CLIENT_SECRET: z.string(),

    OAUTH_GOOGLE_CLIENT_ID: z.string(),
    OAUTH_GOOGLE_CLIENT_SECRET: z.string(),

    OPENAI_API_KEY: z.string(),

    API_NINJAS_API_KEY: z.string(),

    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },
  // still needed, even with no client variables
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
})
