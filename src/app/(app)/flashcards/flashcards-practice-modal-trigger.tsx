import { Suspense } from 'react'

import { getServerCurrentUser } from '@/server/auth'
import { getUserFlashcards } from '@rpc/flashcards'
import { StartPracticeButton } from './start-practice-button'

const _FlashcardsPracticeModalTrigger =
  async (): Promise<React.ReactElement> => {
    const { user } = await getServerCurrentUser()
    const flashcards = await getUserFlashcards(user.id, true)

    return <StartPracticeButton flashcards={flashcards} />
  }

export const FlashcardsPracticeModalTrigger = (): React.ReactElement => (
  <Suspense fallback={<StartPracticeButton flashcards={[]} />}>
    <_FlashcardsPracticeModalTrigger />
  </Suspense>
)
