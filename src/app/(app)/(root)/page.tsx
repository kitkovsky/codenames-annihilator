import { StarIcon, BookOpenIcon } from '@heroicons/react/24/solid'

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

      <HowItWorks />
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

const HowItWorks = (): React.ReactElement => {
  const bulletPoints = [
    {
      h3: 'Chose your favorite',
      p: 'We generate 5 clues for each of your prompts, so that you can choose the one you like the most.',
      Icon: StarIcon,
    },
    {
      h3: 'Flashcards for Codenames',
      p: 'Your prompts and generated clues are saved, allowing you to go back and review them like flashcards.',
      Icon: BookOpenIcon,
    },
  ]

  const promptWords = ['opera', 'spy', 'doctor']
  const clueWords = ['mask', 'role', 'performance', 'mission', 'disguise']

  return (
    <div className="mb-4 mt-12 gap-10 lg:mb-12 lg:mt-24 lg:grid lg:grid-cols-5">
      <div className="col-span-3">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          Connect words like no one else
        </h2>
        <p className="mt-3 text-lg text-light-gray">
          Our clues generator uses bleeding edge AI algorithms to come up with
          the perfect clues to connect your words.
        </p>

        <div className="mt-10 space-y-10">
          {bulletPoints.map(({ h3, p, Icon }, idx) => (
            <div className="flex gap-4" key={idx}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">{h3}</h3>
                <p className="text-base text-light-gray">{p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 w-fit space-y-6 lg:col-span-2 lg:m-auto">
        <div className="flex flex-col gap-2">
          <h3 className="w-fit rounded-md bg-light-gray px-2 py-1 font-semibold text-black-100">
            Prompt words
          </h3>

          <WordsBlocks words={promptWords} />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="w-fit rounded-md bg-primary px-2 py-1 font-semibold text-black-100">
            Generated clues
          </h3>

          <WordsBlocks words={clueWords} />
        </div>
      </div>
    </div>
  )
}

const WordsBlocks = (props: { words: string[] }): React.ReactElement => (
  <div className="flex flex-wrap gap-3">
    {props.words.map((word) => (
      <span
        className="w-fit rounded bg-white px-3 py-1 text-sm font-medium text-black-90"
        key={word}
      >
        {word}
      </span>
    ))}
  </div>
)
