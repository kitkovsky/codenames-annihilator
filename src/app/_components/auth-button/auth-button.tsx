import { Suspense } from 'react'

import { Link } from '@components/ui/link'
import { getServerAuthSession } from '@/server/auth'
import { UserIcon } from '@components/layout/user-icon'
import { LogOutButton } from '@components/auth-button/log-out-button'
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

  const session = await getServerAuthSession()
  const user = session?.user

  return (
    <div className={className}>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserIcon user={user} />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="p-1" align="end">
            <DropdownMenuItem className="hover:cursor-pointer">
              <LogOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {!user && <SignInButton />}
    </div>
  )
}

const SignInButton = (): React.ReactElement => (
  <Link href="sign-in" variant="default">
    Sign in
  </Link>
)

export const AuthButton = (props: _AuthButtonProps): React.ReactElement => (
  <Suspense fallback={<SignInButton />}>
    <_AuthButton className={props.className} />
  </Suspense>
)
