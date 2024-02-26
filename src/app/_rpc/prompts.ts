import { db } from '@/server/db'
import { eq } from 'drizzle-orm'

import { prompts, type PromptWithClue } from '@/server/db/schema/prompts'

export const LOCAL_PROMPTS_COOKIE_NAME = 'prompts'

export const getUserPrompts = async (
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
