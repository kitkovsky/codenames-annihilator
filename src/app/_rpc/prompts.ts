import { db } from '@/server/db'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

import { prompts, type PromptWithConnector } from '@/server/db/schema/prompts'

export const LOCAL_PROMPTS_COOKIE_NAME = 'prompts'

export const getUserPromptsFromDB = async (
  userId: string,
): Promise<PromptWithConnector[]> => {
  const userPrompts = await db.query.prompts.findMany({
    with: {
      promptWords: true,
      connector: {
        with: {
          connectorWords: true,
        },
      },
    },
    where: eq(prompts.authorId, userId),
    orderBy: (prompts, { desc }) => [desc(prompts.createdAt)],
  })

  return userPrompts
}

export const getUserPromptsFromCookie = (): PromptWithConnector[] => {
  const cookieStore = cookies()
  const prompts = cookieStore.get(LOCAL_PROMPTS_COOKIE_NAME)?.value

  return prompts ? (JSON.parse(prompts) as PromptWithConnector[]) : []
}
