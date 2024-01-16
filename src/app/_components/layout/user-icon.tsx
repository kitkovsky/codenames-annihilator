import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import type { User } from '@auth/core/types'

import { cn } from '@utils/cn.utils'

export interface UserIconProps {
  user: User
  size?: 'sm' | 'lg'
}

export const UserIcon = async (
  props: UserIconProps,
): Promise<React.ReactElement> => {
  const { user, size = 'lg' } = props
  const imageSize = size === 'sm' ? 32 : 48
  const iconSize = size === 'sm' ? 'h-8 w-8' : 'h-12 w-12'

  return (
    <>
      {user.image && (
        <Image
          src={user.image}
          width={imageSize}
          height={imageSize}
          className="rounded-full bg-primary"
          alt="user image"
        />
      )}
      {!user.image && (
        <UserCircleIcon className={cn('text-primary', iconSize)} />
      )}
    </>
  )
}
