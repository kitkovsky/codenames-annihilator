import {
  type PromptWord,
  type PromptWithPromptWords,
} from '@/server/db/schema/prompts'

export const createLocalPromptWithPromptWords = (
  _promptWords: string[],
): PromptWithPromptWords => {
  const promptId = Math.floor(Math.random() * 1_000_000)
  const promptWords: PromptWord[] = _promptWords.map((word) => ({
    id: Math.floor(Math.random() * 1_000_000),
    promptId,
    word,
  }))
  const promptWithPromptWords: PromptWithPromptWords = {
    id: promptId,
    createdAt: String(new Date()),
    authorId: '1',
    promptWords: promptWords,
  }

  return promptWithPromptWords
}
