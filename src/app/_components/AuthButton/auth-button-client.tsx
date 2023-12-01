'use client'

import { signIn, signOut } from 'next-auth/react'

import type { Session } from '@/server/auth'
import { Button } from '@components/button'
import Image from 'next/image'

export interface AuthButtonClientProps {
  session: Session
}

export const AuthButtonClient = (props: AuthButtonClientProps) => {
  const { session } = props

  return (
    <>
      <Button onClick={session ? () => signOut() : () => signIn('github')}>
        {session ? 'log out' : 'sign in with github'}
      </Button>

      {session?.user && (
        <Image
          src={session.user.image ?? ''}
          width="320"
          height="320"
          alt="profile picture"
          priority
        />
      )}
    </>
  )
}
