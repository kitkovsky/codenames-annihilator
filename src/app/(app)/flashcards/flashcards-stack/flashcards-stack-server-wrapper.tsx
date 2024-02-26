import { Suspense } from 'react'

import { getServerAuthSession } from '@/server/auth'
import { getUserFlashcards } from '@rpc/flashcards'
import { FlashcardsStack } from './flashcards-stack'

const _FlashcardsStackServerWrapper = async (): Promise<React.ReactElement> => {
  const session = await getServerAuthSession()
  const user = session?.user

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
