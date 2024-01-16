'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { db } from '@/server/db'
import {
  promptWords,
  prompts,
  type PromptWithConnector,
} from '@/server/db/schema/prompts'
import { getServerAuthSession } from '@/server/auth'
import {
  LOCAL_PROMPTS_COOKIE_NAME,
  getUserPromptsFromCookie,
} from '@rpc/prompts'
import { connectors, connectorWords } from '@/server/db/schema/connectors'
import { createLocalPromptWithPromptWords } from '@utils/prompts.utils'
import {
  createLocalConnectorWithConnectorWords,
  getConnectorWords,
} from '@utils/connectors.utils'

export const generateAndSavePromptWithConnector = async (
  formPrompts: string[],
): Promise<void> => {
  const session = await getServerAuthSession()
  const userId = session?.user.id

  if (!userId) await generateAndSaveToCookie(formPrompts)
  if (userId) await generateAndSaveToDB(formPrompts, userId)

  revalidatePath('/generate')
}

const generateAndSaveToCookie = async (
  promptWords: string[],
): Promise<void> => {
  const promptWithPromptWords = createLocalPromptWithPromptWords(promptWords)
  const connectorWithConnectorWords =
    await createLocalConnectorWithConnectorWords(promptWithPromptWords.id)

  const promptWithConnector: PromptWithConnector = {
    ...promptWithPromptWords,
    connector: connectorWithConnectorWords,
  }

  const existingPrompts = getUserPromptsFromCookie()

  cookies().set(
    LOCAL_PROMPTS_COOKIE_NAME,
    JSON.stringify([promptWithConnector, ...existingPrompts]),
  )
}

const generateAndSaveToDB = async (
  formPromptWords: string[],
  userId: string,
): Promise<void> => {
  const aiConnectorWords = await getConnectorWords({
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

    const { insertedConnectorId } = (
      await tx
        .insert(connectors)
        .values({ promptId: insertedPromptId })
        .returning({ insertedConnectorId: connectors.id })
    )[0]!
    await tx.insert(connectorWords).values(
      aiConnectorWords.map((connectorWord) => ({
        connectorId: insertedConnectorId,
        word: connectorWord,
      })),
    )
  })
}
