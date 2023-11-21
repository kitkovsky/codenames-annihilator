import { isClientSide } from '@/app/_utils/flags.utils'

export const getBaseUrl = (): string => {
  if (isClientSide) return ''

  if (process.env['VERCEL_URL']) return 'https://' + process.env['VERCEL_URL']

  return 'http://localhost:3000'
}

export const getApiUrl = (): string => getBaseUrl() + '/api/trpc'
