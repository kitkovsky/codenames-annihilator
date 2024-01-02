import { Suspense } from 'react'

import { Link } from '@components/ui/link'
import { getServerAuthSession } from '@/server/auth'
import { UserIcon } from '@components/user-icon'

export interface _AuthButtonProps {
  className?: string
}

const _AuthButton = async (props: _AuthButtonProps) => {
  const { className } = props

  const session = await getServerAuthSession()
  const user = session?.user

  return (
    <div className={className}>
      {user && <UserIcon user={user} />}
      {!user && <SignInButton />}
    </div>
  )
}

const SignInButton = () => (
  <Link href="sign-in" type="default">
    Sign in
  </Link>
)

export const AuthButton = (props: _AuthButtonProps) => (
  <Suspense fallback={<SignInButton />}>
    <_AuthButton className={props.className} />
  </Suspense>
)
