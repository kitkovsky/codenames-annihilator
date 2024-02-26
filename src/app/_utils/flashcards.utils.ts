import type { FLASHCARD_STATES } from '@/server/db/schema/flashcards'
import type { colors } from '~/tailwind.config'

export const flashcardStateBorder: Record<
  (typeof FLASHCARD_STATES)[number],
  `border-${keyof typeof colors}`
> = {
  not_practised: 'border-gray-100',
  fail: 'border-red',
  hard: 'border-orange',
  good: 'border-blue',
  easy: 'border-green',
}

export const flashcardStateToSentenceCase = (str: string): string => {
  return str
    .split('_')
    .map((word) => word.toLowerCase())
    .map((word, idx) =>
      idx === 0 ? word[0]?.toUpperCase() + word.slice(1) : word,
    )
    .join(' ')
}
