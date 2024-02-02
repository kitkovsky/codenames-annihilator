import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'

import { Logo } from '@components/logo'
import { Link } from '@components/ui/link'
import {
  AuthProviderButton,
  type AuthProviderButtonProps,
} from './auth-provider-button'
import { routes } from '@utils/routes.utils'

const providers: AuthProviderButtonProps[] = [
  {
    type: 'github',
    name: 'GitHub',
    icon: faGithub,
  },
  {
    type: 'google',
    name: 'Google',
    icon: faGoogle,
  },
]

export default function SignInPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex h-svh flex-col items-center justify-center gap-10">
        <Logo size="lg" />
        <div className="flex w-full flex-col items-center gap-4 rounded-none border border-x-0 border-gray-100 bg-black-80 px-4 py-6 sm:w-fit sm:rounded-lg sm:border-x sm:px-10">
          <h3 className="text-sm">Sign in with</h3>

          <div className="flex gap-4">
            {providers.map((provider) => (
              <AuthProviderButton {...provider} key={provider.type} />
            ))}
          </div>

          <p className="text-xs text-lighter-gray">
            By signing up, you agree to our{' '}
            <Link
              variant="clear"
              href={routes.termsOfService()}
              className="p-0 text-xs font-medium text-white"
            >
              terms of service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
