'use client'

import { Suspense } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { type OAuthProviderType } from '@auth/core/providers'

import { Button } from '@components/ui/button'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { SIGN_IN_REDIRECT_PARAM } from '@utils/routes.utils'

export interface AuthProviderButtonProps {
  type: OAuthProviderType
  name: string
  icon: IconDefinition
}

const _AuthProviderButton = (
  props: AuthProviderButtonProps,
): React.ReactElement => {
  const { type, name, icon } = props

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get(SIGN_IN_REDIRECT_PARAM) ?? '/'

  return (
    <Button
      onClick={() => signIn(type, { callbackUrl })}
      variant="custom"
      className="rounded-md border border-gray-100 px-8 py-6 text-lg font-medium hover:bg-gray-100/50"
      key={type}
    >
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {name}
    </Button>
  )
}

export const AuthProviderButton = (
  props: AuthProviderButtonProps,
): React.ReactElement => (
  <Suspense>
    <_AuthProviderButton {...props} />
  </Suspense>
)
