'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { type OAuthProviderType } from '@auth/core/providers'

import { Button } from '@components/ui/button'
import { signIn } from 'next-auth/react'

export interface AuthProviderButtonProps {
  type: OAuthProviderType
  name: string
  icon: IconDefinition
}

export const AuthProviderButton = (
  props: AuthProviderButtonProps,
): React.ReactElement => {
  const { type, name, icon } = props

  return (
    <Button
      onClick={() => signIn(type, { callbackUrl: '/' })}
      variant="custom"
      className="rounded-md border border-gray-100 px-8 py-6 text-lg font-medium hover:bg-gray-100/50"
      key={type}
    >
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {name}
    </Button>
  )
}
