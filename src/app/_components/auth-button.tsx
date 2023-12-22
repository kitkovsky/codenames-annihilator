import Image from 'next/image'
import { Suspense } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'

import { Link } from '@components/ui/link'
import { getServerAuthSession } from '@/server/auth'

const _AuthButton = async () => {
  const session = await getServerAuthSession()
  const user = session?.user

  return (
    <>
      {user && (
        <>
          {user.image && (
            <Image
              src={user.image}
              width="48"
              height="48"
              className="rounded-full bg-primary"
              alt="user image"
            />
          )}
          {!user.image && <UserCircleIcon className="h-12 w-12 text-primary" />}
        </>
      )}

      {!user && <SignInButton />}
    </>
  )
}

const SignInButton = () => (
  <Link href="sign-in" type="default">
    Sign in
  </Link>
)

export const AuthButton = () => (
  <Suspense fallback={<SignInButton />}>
    <_AuthButton />
  </Suspense>
)
