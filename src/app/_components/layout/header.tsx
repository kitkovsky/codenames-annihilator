import { Link } from '@components/ui/link'
import { AuthButton } from '@components/auth-button'
import { HamburgerMenu } from './hamburger-menu'
import { Logo } from '@components/logo'
import { routes } from '@utils/routes.utils'

export const NAV_LINKS = [
  { href: routes.generator(), label: 'Generator' },
  { href: routes.flashcards(), label: 'Flashcards' },
  { href: routes.faq(), label: 'FAQ' },
]

export const Header = (): React.ReactElement => (
  <header>
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <nav className="flex items-center justify-between sm:pt-2">
        <div className="flex">
          <Logo className="mr-12" />
          <div className="hidden md:flex">
            {NAV_LINKS.map((link) => (
              <Link href={link.href} variant="clear" key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <AuthButton className="hidden max-h-10 md:block" />
        <HamburgerMenu className="block md:hidden" />
      </nav>
    </div>
  </header>
)
