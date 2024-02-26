import { db } from '@/server/db'
import {
  flashcards,
  type Flashcard,
  type FLASHCARD_STATES_ENUM,
} from '@/server/db/schema/flashcards'
import { eq } from 'drizzle-orm'

const FLASHCARD_STATE_PRIORITY: Record<FLASHCARD_STATES_ENUM, number> = {
  not_practised: 5,
  fail: 4,
  hard: 3,
  good: 2,
  easy: 1,
}

export const getUserFlashcards = async (
  userId: string,
  sortedByState = false,
): Promise<Flashcard[]> => {
  const userFlashcards = await db.query.flashcards.findMany({
    with: {
      prompt: {
        with: {
          promptWords: true,
        },
      },
      clue: {
        with: {
          clueWords: true,
        },
      },
    },
    where: eq(flashcards.authorId, userId),
    orderBy: (flashcards, { desc }) => [desc(flashcards.createdAt)],
  })

  if (sortedByState) {
    userFlashcards.sort(
      (a, b) =>
        FLASHCARD_STATE_PRIORITY[b.state] - FLASHCARD_STATE_PRIORITY[a.state],
    )
  }

  return userFlashcards
}
