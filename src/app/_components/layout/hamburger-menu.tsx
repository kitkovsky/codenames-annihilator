import { Suspense } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

import { UserIcon } from '@components/user-icon'
import { Logo } from '@components/logo'
import { Link } from '@components/ui/link'
import { LogOutButton } from '@components/auth-button/log-out-button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogCloseAccessibilityClassNames,
} from '@components/ui/dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { NAV_LINKS } from '@components/layout/header'
import { getServerAuthSession } from '@/server/auth'
import { cn } from '@utils/cn.utils'

export interface HamburgerMenuProps {
  className?: string
}

export const HamburgerMenu = (props: HamburgerMenuProps) => {
  const { className } = props

  return (
    <Dialog>
      <DialogTrigger className="block md:hidden">
        <Bars3Icon className={cn('h-8 w-8 text-primary', className)} />
      </DialogTrigger>

      <DialogContent
        className="left-4 top-4 sm:left-6"
        position="absolute"
        customClose
      >
        <div>
          <div className="flex items-center justify-between px-6 pb-4 pt-6">
            <DialogClose asChild>
              <Logo size="sm" />
            </DialogClose>
            <DialogClose className={DialogCloseAccessibilityClassNames}>
              <XMarkIcon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <div className="flex flex-col px-2">
            {NAV_LINKS.map((link) => (
              <DialogClose key={link.href} asChild>
                <Link href={link.href} variant="clear">
                  {link.label}
                </Link>
              </DialogClose>
            ))}
          </div>

          <div className="px-6 pb-6 pt-4">
            <div className="h-px w-full bg-gray-100" />
          </div>

          <Suspense fallback={null}>
            <HamburgerMenuFooter />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const HamburgerMenuFooter = async () => {
  const session = await getServerAuthSession()
  const user = session?.user

  return (
    <div className="px-6 pb-6">
      {user && (
        <Accordion type="single" collapsible>
          <AccordionItem value="user-profile" className="border-none">
            <AccordionTrigger className="py-0">
              <div className="flex items-center justify-start gap-3">
                <UserIcon user={user} size="sm" />
                <span>{user.name}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="p-0">
              <LogOutButton className="mt-4 text-base" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {!user && (
        <DialogClose asChild className="w-full">
          <Link href="sign-in" variant="default" className="w-full">
            Sign in
          </Link>
        </DialogClose>
      )}
    </div>
  )
}
