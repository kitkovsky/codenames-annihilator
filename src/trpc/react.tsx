'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { unstable_httpBatchStreamLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useState } from 'react'

import { getApiUrl } from '@/trpc/shared'
import type { AppRouter } from '@/server/api/root'

export const api = createTRPCReact<AppRouter>()

export const TRPCReactProvider = ({
  children,
  cookies,
}: {
  children: React.ReactNode
  cookies: string
}): React.ReactNode => {
  const [queryClient] = useState(() => new QueryClient())

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        unstable_httpBatchStreamLink({
          url: getApiUrl(),
          headers() {
            return {
              cookies: cookies,
              'x-trpc-source': 'react',
            }
          },
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  )
}
