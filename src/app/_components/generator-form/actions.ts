'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { db } from '@/server/db'
import {
  promptWords,
  prompts,
  type PromptWord,
  type PromptWithPromptWords,
} from '@/server/db/schema/prompts'
import { getServerAuthSession } from '@/server/auth'

export const insertPrompts = async (formPrompts: string[]): Promise<void> => {
  const session = await getServerAuthSession()
  const userId = session?.user.id

  if (!userId) {
    const promptWithPromptWords: PromptWithPromptWords = {
      id: Math.floor(Math.random() * 1_000_000),
      createdAt: String(new Date()),
      authorId: '1',
      promptWords: [],
    }
    const promptWords: PromptWord[] = formPrompts.map((word) => ({
      id: Math.floor(Math.random() * 1_000_000),
      promptId: promptWithPromptWords.id,
      word,
    }))
    promptWithPromptWords.promptWords = promptWords

    cookies().set('prompts', JSON.stringify(promptWithPromptWords))
  }

  if (userId) {
    await db.transaction(async (tx) => {
      const { insertedId } = (
        await tx
          .insert(prompts)
          .values({ authorId: userId })
          .returning({ insertedId: prompts.id })
      )[0]!

      await tx
        .insert(promptWords)
        .values(
          formPrompts.map((prompt) => ({ promptId: insertedId, word: prompt })),
        )
    })
  }

  revalidatePath('/generate')
}
