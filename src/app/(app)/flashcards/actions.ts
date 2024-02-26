'use server'

import { db } from '@/server/db'
import {
  flashcards,
  type FLASHCARD_STATES_ENUM,
} from '@/server/db/schema/flashcards'
import { routes } from '@utils/routes.utils'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

const updateFlashcardState = async (
  flashcardId: number,
  state: FLASHCARD_STATES_ENUM,
): Promise<void> => {
  await db
    .update(flashcards)
    .set({ state })
    .where(eq(flashcards.id, flashcardId))
}

const revalidateFlashcardsPath = (): void => revalidatePath(routes.flashcards())

export { updateFlashcardState, revalidateFlashcardsPath }
