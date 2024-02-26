import { Suspense } from 'react'

import { getServerCurrentUser } from '@/server/auth'
import { getUserFlashcards } from '@rpc/flashcards'
import { FlashcardsStack } from './flashcards-stack'

const _FlashcardsStackServerWrapper = async (): Promise<React.ReactElement> => {
  const user = await getServerCurrentUser()

  if (!user) {
    return <div>TODO: maybe? implement saving to cookies/local storage</div>
  }

  const flashcards = await getUserFlashcards(user.id, true)

  return <FlashcardsStack flashcards={flashcards} />
}

export const FlashcardsStackServerWrapper = (): React.ReactElement => (
  <Suspense>
    <_FlashcardsStackServerWrapper />
  </Suspense>
)
