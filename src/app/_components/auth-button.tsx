'use client'

import type { Session } from '@/server/auth'
import { Button } from '@components/button'
import { signIn, signOut } from 'next-auth/react'

export const AuthButton = ({ session }: { session: Session }) => {
  return (
    <>
      {session && <Button onClick={() => signOut()}>log out</Button>}
      {!session && (
        <div className="flex gap-3">
          <Button onClick={() => signIn('github')}>sign in with github</Button>
          <Button onClick={() => signIn('google')}>sign in with google</Button>
        </div>
      )}
    </>
  )
}
