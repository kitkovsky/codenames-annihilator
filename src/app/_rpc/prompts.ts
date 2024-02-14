import { db } from '@/server/db'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

import { prompts, type PromptWithClue } from '@/server/db/schema/prompts'

export const LOCAL_PROMPTS_COOKIE_NAME = 'prompts'

export const getUserPromptsFromDB = async (
  userId: string,
): Promise<PromptWithClue[]> => {
  const userPrompts = await db.query.prompts.findMany({
    with: {
      promptWords: true,
      clue: {
        with: {
          clueWords: true,
        },
      },
    },
    where: eq(prompts.authorId, userId),
    orderBy: (prompts, { desc }) => [desc(prompts.createdAt)],
  })

  return userPrompts
}

export const getUserPromptsFromCookie = (): PromptWithClue[] => {
  const cookieStore = cookies()
  const prompts = cookieStore.get(LOCAL_PROMPTS_COOKIE_NAME)?.value

  return prompts ? (JSON.parse(prompts) as PromptWithClue[]) : []
}
