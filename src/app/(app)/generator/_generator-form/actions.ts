'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { db } from '@/server/db'
import {
  promptWords,
  prompts,
  type PromptWithClue,
} from '@/server/db/schema/prompts'
import { getServerCurrentUser } from '@/server/auth'
import {
  LOCAL_PROMPTS_COOKIE_NAME,
  getUserPromptsFromCookie,
  getUserPromptsFromDB,
} from '@rpc/prompts'
import { clues, clueWords } from '@/server/db/schema/clues'
import { createLocalPromptWithPromptWords } from '@utils/prompts.utils'
import { createLocalClueWithClueWords, getClueWords } from '@utils/clues.utils'
import { FREE_GENERATIONS_LIMIT } from '@consts/generations.consts'
import { routes } from '@utils/routes.utils'
import {
  FLASHCARD_STATES_ENUM,
  flashcards,
} from '@/server/db/schema/flashcards'

const DEMO_VERSION_MODAL_SHOWN_COOKIE_NAME = 'demo_version_modal_shown'

const generateAndSavePromptWithClue = async (
  formPrompts: string[],
): Promise<void> => {
  const user = await getServerCurrentUser()
  const userId = user?.id

  if (!userId) await generateAndSaveToCookie(formPrompts)
  if (userId) await generateAndSaveToDB(formPrompts, userId)

  revalidatePath(routes.generator())
}

const generateAndSaveToCookie = async (
  promptWords: string[],
): Promise<void> => {
  const promptWithPromptWords = createLocalPromptWithPromptWords(promptWords)
  const clueWithClueWords = await createLocalClueWithClueWords(
    promptWithPromptWords.id,
  )

  const promptWithClue: PromptWithClue = {
    ...promptWithPromptWords,
    clue: clueWithClueWords,
  }

  const existingPrompts = getUserPromptsFromCookie()

  cookies().set(
    LOCAL_PROMPTS_COOKIE_NAME,
    JSON.stringify([promptWithClue, ...existingPrompts]),
  )
}

const generateAndSaveToDB = async (
  formPromptWords: string[],
  userId: string,
): Promise<void> => {
  const aiClueWords = await getClueWords({
    source: 'openAI',
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
  const user = await getServerCurrentUser()

  const shouldShowDemoModal =
    !cookieStore.has(DEMO_VERSION_MODAL_SHOWN_COOKIE_NAME) && !user

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
  const user = await getServerCurrentUser()
  const userId = user?.id
  const userPrompts = userId
    ? await getUserPromptsFromDB(userId)
    : getUserPromptsFromCookie()

  return userPrompts.length >= FREE_GENERATIONS_LIMIT
}

export {
  generateAndSavePromptWithClue,
  getDemoModalVisibility,
  saveModalShownCookie,
  getGenerationsLimitModalVisibility,
}
