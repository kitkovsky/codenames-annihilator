import { Link } from '@components/ui/link'
import { AuthButton } from '@components/auth-button'
import { HamburgerMenu } from './hamburger-menu'
import { Logo } from './logo'

export const NAV_LINKS = [
  { href: '/generator', label: 'Generator' },
  { href: '/flashcards', label: 'Flashcards' },
  { href: '/faq', label: 'Why?' },
]

export const Header = () => (
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

        <AuthButton className="hidden md:block" />
        <HamburgerMenu className="block md:hidden" />
      </nav>
    </div>
  </header>
)
