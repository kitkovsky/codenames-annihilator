import NextLink from 'next/link'

import { Link } from '@components/ui/link'
import { AuthButton } from '@components/auth-button'

export const Header = () => {
  const navLinks = [
    { href: '/generate', label: 'Generate' },
    { href: '/flashcards', label: 'Flashcards' },
    { href: '/faq', label: 'Why?' },
  ]

  return (
    <header>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex">
            <Logo />
            <div className="flex">
              {navLinks.map((link) => (
                <Link href={link.href} type="clear" key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <AuthButton />
        </nav>
      </div>
    </header>
  )
}

const Logo = () => (
  <NextLink
    href="/"
    className="group mr-12 flex flex-col font-bold transition-all"
  >
    <span className="text-lg leading-none group-hover:text-foreground/85">
      CODENAMES
    </span>
    <span className="text-2xl leading-none text-primary group-hover:text-primary/85">
      ANNIHILATOR
    </span>
  </NextLink>
)