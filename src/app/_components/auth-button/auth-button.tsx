import { Suspense } from 'react'

import { getServerCurrentUser } from '@/server/auth'
import { UserIcon } from '@components/layout/user-icon'
import { LogOutButton } from './log-out-button'
import { SignInButton } from './sign-in-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@components/ui/dropdown-menu'

export interface _AuthButtonProps {
  className?: string
}

const _AuthButton = async (
  props: _AuthButtonProps,
): Promise<React.ReactElement> => {
  const { className } = props

  const user = await getServerCurrentUser()

  return (
    <div className={className}>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserIcon user={user} />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="p-1" align="end">
            <DropdownMenuItem className="p-0 hover:cursor-pointer">
              <LogOutButton className="px-2 py-1.5" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {!user && <SignInButton />}
    </div>
  )
}

export const AuthButton = (props: _AuthButtonProps): React.ReactElement => (
  <Suspense fallback={<SignInButton className={props.className} />}>
    <_AuthButton {...props} />
  </Suspense>
)
