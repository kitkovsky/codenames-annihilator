'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client' // unstable_httpBatchStreamLink
import { useState } from 'react'

import { getApiUrl } from '@/trpc/shared'
import { trpc } from '@/trpc/client'

export const TRPCReactProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode => {
  const [queryClient] = useState(() => new QueryClient())

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getApiUrl(),
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
