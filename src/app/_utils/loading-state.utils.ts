import { useState } from 'react'

export const useLoadingState = (
  fn: () => Promise<void>,
): { loading: boolean; wrappedFn: () => Promise<void> } => {
  const [loading, setLoading] = useState<boolean>(false)

  const wrappedFn = async (): Promise<void> => {
    try {
      setLoading(true)
      await fn()
    } catch {
      setLoading(false)
    }
    setLoading(false)
  }

  return { loading, wrappedFn }
}
