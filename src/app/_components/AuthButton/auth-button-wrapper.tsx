import { getServerAuthSession } from '@/server/auth'
import { AuthButtonClient } from '@components/AuthButton/auth-button-client'

export const AuthButton = async () => {
  const session = await getServerAuthSession()

  return <AuthButtonClient session={session} />
}
