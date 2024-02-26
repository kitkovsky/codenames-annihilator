'use client'

import { useState } from 'react'

import { Button } from '@components/ui/button'
import { type colors } from '~/tailwind.config'
import { cn } from '@utils/cn.utils'
import {
  type Flashcard,
  FLASHCARD_STATES_ENUM,
} from '@/server/db/schema/flashcards'
import { updateFlashcardState } from '../actions'

export interface FlashcardCardProps {
  flashcard: Flashcard
  animateOut: () => void
}

export const FlashcardCard = (
  props: FlashcardCardProps,
): React.ReactElement => {
  const { flashcard, animateOut } = props

  const [flipButtonVisible, setFlipButtonVisible] = useState(true)
  const memoButtonsVisible = !flipButtonVisible
  const clueWordsVisible = memoButtonsVisible

  const promptWords = flashcard.prompt.promptWords
    .map((promptWord) => promptWord.word)
    .join(', ')
  const clueWords = flashcard.clue.clueWords
    .map((clueWord) => clueWord.word)
    .join(', ')

  return (
    <div className="flex h-full flex-col justify-between" key={flashcard.id}>
      <div className="flex h-full flex-col items-center justify-center">
        <span className="px-2 text-center">{promptWords}</span>
        <div className="my-2 h-px w-full bg-black-80" />
        <span
          className={cn('px-2 text-center', {
            // this trick keeps the span (and its height) in the DOM,
            // and prevents it from popping in when changing the visibility
            'select-none text-black-90': !clueWordsVisible,
          })}
        >
          {clueWords}
        </span>
      </div>

      {flipButtonVisible && (
        <Button
          onClick={() => setFlipButtonVisible(false)}
          variant="ghost"
          className="min-h-10 w-full rounded rounded-t-none border-2 border-x-0 border-b-0 border-mint-green text-base font-semibold"
        >
          Show clues
        </Button>
      )}

      {memoButtonsVisible && (
        <div className="flex">
          {memorizationButtons.map(({ label, value, border }) => (
            <Button
              onClick={async () => {
                animateOut()
                await updateFlashcardState(flashcard.id, value)
              }}
              variant="ghost"
              className={cn(
                'border-top grow rounded-none border-2 border-x-0 border-b-0 text-base font-semibold hover:bg-black-80',
                border,
              )}
              key={value}
            >
              {label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

const memorizationButtons: {
  label: string
  value: FLASHCARD_STATES_ENUM
  border: `border-${keyof typeof colors}`
}[] = [
  {
    label: 'Fail',
    value: FLASHCARD_STATES_ENUM.FAIL,
    border: 'border-red',
  },
  {
    label: 'Hard',
    value: FLASHCARD_STATES_ENUM.HARD,
    border: 'border-orange',
  },
  {
    label: 'Good',
    value: FLASHCARD_STATES_ENUM.GOOD,
    border: 'border-blue',
  },
  {
    label: 'Easy',
    value: FLASHCARD_STATES_ENUM.EASY,
    border: 'border-green',
  },
]
