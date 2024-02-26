'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'

import { db } from '@/server/db'
import { promptWords, prompts } from '@/server/db/schema/prompts'
import { getServerCurrentUser } from '@/server/auth'
import { getUserPrompts } from '@rpc/prompts'
import { clues, clueWords } from '@/server/db/schema/clues'
import { getClueWords } from '@utils/clues.utils'
import { FREE_GENERATIONS_LIMIT } from '@consts/generations.consts'
import { routes } from '@utils/routes.utils'
import {
  FLASHCARD_STATES_ENUM,
  flashcards,
} from '@/server/db/schema/flashcards'
import { users, type NewUser } from '@/server/db/schema/users'

const DEMO_VERSION_MODAL_SHOWN_COOKIE_NAME = 'demo_version_modal_shown'

const generateAndSavePromptWithClue = async (
  formPrompts: string[],
): Promise<void> => {
  const { user, isGhostUser } = await getServerCurrentUser()
  const userId = user.id

  if (isGhostUser) {
    const userExistsInDB = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })

    if (!userExistsInDB) {
      const newGhostUser: NewUser = {
        id: userId,
        email: 'ghost@user.com',
        ghostUser: true,
      }
      await db.insert(users).values(newGhostUser)
    }
  }

  await generateAndSaveToDB(
    formPrompts,
    userId,
    isGhostUser ? 'random' : 'openAI',
  )

  revalidatePath(routes.generator())
}

const generateAndSaveToDB = async (
  formPromptWords: string[],
  userId: string,
  clueWordsSource: 'random' | 'openAI',
): Promise<void> => {
  const aiClueWords = await getClueWords({
    source: clueWordsSource,
    promptWords: formPromptWords.join(','),
  })

  await db.transaction(async (tx) => {
    const { insertedPromptId } = (
      await tx
        .insert(prompts)
        .values({ authorId: userId })
        .returning({ insertedPromptId: prompts.id })
    )[0]!
    await tx.insert(promptWords).values(
      formPromptWords.map((prompt) => ({
        promptId: insertedPromptId,
        word: prompt,
      })),
    )

    const { insertedClueId } = (
      await tx
        .insert(clues)
        .values({ promptId: insertedPromptId })
        .returning({ insertedClueId: clues.id })
    )[0]!
    await tx.insert(clueWords).values(
      aiClueWords.map((clueWord) => ({
        clueId: insertedClueId,
        word: clueWord,
      })),
    )

    await tx.insert(flashcards).values({
      authorId: userId,
      promptId: insertedPromptId,
      clueId: insertedClueId,
      state: FLASHCARD_STATES_ENUM.NOT_PRACTISED,
    })
  })
}

const getDemoModalVisibility = async (): Promise<boolean> => {
  const cookieStore = cookies()
  const { isGhostUser } = await getServerCurrentUser()

  const shouldShowDemoModal =
    !cookieStore.has(DEMO_VERSION_MODAL_SHOWN_COOKIE_NAME) && isGhostUser

  return shouldShowDemoModal
}

const saveModalShownCookie = (): void => {
  const cookieStore = cookies()
  const date400DaysFromNow = new Date(Date.now() + 400 * 24 * 60 * 60 * 1000)

  cookieStore.set(DEMO_VERSION_MODAL_SHOWN_COOKIE_NAME, 'true', {
    expires: date400DaysFromNow,
  })
}

const getGenerationsLimitModalVisibility = async (): Promise<boolean> => {
  const { user } = await getServerCurrentUser()
  const userId = user.id
  const userPrompts = await getUserPrompts(userId)

  return userPrompts.length >= FREE_GENERATIONS_LIMIT
}

export {
  generateAndSavePromptWithClue,
  getDemoModalVisibility,
  saveModalShownCookie,
  getGenerationsLimitModalVisibility,
}
