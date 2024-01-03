'use client'

import { ArrowUpTrayIcon } from '@heroicons/react/16/solid'
import { signOut } from 'next-auth/react'

import { cn } from '@utils/cn.utils'

export interface LogOutButtonProps {
  className?: string
}

export const LogOutButton = (props: LogOutButtonProps) => {
  const { className } = props

  return (
    <button
      className={cn('flex items-center text-sm', className)}
      onClick={() => signOut()}
    >
      <ArrowUpTrayIcon className="mr-2 h-4 w-4 rotate-90" />
      <span>Log out</span>
    </button>
  )
}
