'use client'

import { usePathname } from 'next/navigation'

import { Link } from '@components/ui/link'
import { routes } from '@utils/routes.utils'

export interface SignInButtonProps {
  className?: string
}

export const SignInButton = (props: SignInButtonProps): React.ReactElement => {
  const { className } = props
  const pathname = usePathname()

  return (
    <Link
      href={routes.signIn(pathname)}
      variant="default"
      className={className}
    >
      Sign in
    </Link>
  )
}
