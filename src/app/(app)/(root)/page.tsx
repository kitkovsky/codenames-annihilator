import { BoardGame } from './board-game'
import { Link } from '@components/ui/link'
import { routes } from '@utils/routes.utils'

export default function HomePage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="pt-4 sm:pt-8 md:pt-10 lg:flex lg:justify-between lg:gap-8 lg:pt-14">
        <HeroText />
        <BoardGame className="mx-auto mt-8 max-w-md lg:mx-0 lg:mt-0 lg:shrink-0" />
      </div>
    </div>
  )
}

const HeroText = (): React.ReactElement => (
  <div className="mx-auto max-w-md sm:max-w-2xl sm:text-center lg:mx-0 lg:max-w-3xl lg:text-left">
    <h1 className="flex flex-col text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
      <span>Elevate your game,</span>
      <span>
        <span className="text-primary">annihilate</span> the competition
      </span>
    </h1>

    <h3 className="pt-3 text-base text-lighter-gray">
      Hone your Codenames&trade; skills using the power of our new AI overlords.
      Become a better version of yourself today.
    </h3>

    <Link
      variant="default"
      href={routes.generator()}
      className="mt-6 px-6 py-6 text-lg font-medium sm:mt-8"
    >
      Change your life now
    </Link>

    <p className="mt-3 text-sm text-lighter-gray sm:mt-4 lg:max-w-sm">
      By signing up for Codenames Annihilator, you agree to our{' '}
      <Link
        variant="clear"
        href={routes.termsOfService()}
        className="p-0 text-sm font-medium text-white"
      >
        terms of service
      </Link>
      .
    </p>
  </div>
)
