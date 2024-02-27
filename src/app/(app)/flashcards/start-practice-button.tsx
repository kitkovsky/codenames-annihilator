'use client'

import { useState } from 'react'

import { Dialog, DialogContent } from '@components/ui/dialog'
import { Button } from '@components/ui/button'
import { revalidateFlashcardsPath } from './actions'
import type { Flashcard } from '@/server/db/schema/flashcards'
import { FlashcardsStack } from './flashcards-stack'
import { isEmpty } from '@utils/array.utils'

export interface StartPracticeButtonProps {
  flashcards: Flashcard[]
}

export const StartPracticeButton = (
  props: StartPracticeButtonProps,
): React.ReactElement => {
  const { flashcards } = props
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        className="text-sm font-semibold sm:text-base"
        disabled={isEmpty(flashcards)}
      >
        Start practising
      </Button>

      <Dialog open={visible}>
        <DialogContent
          customClose
          noBackground
          className="flex justify-center"
          onInteractOutside={() => {
            revalidateFlashcardsPath()
            setVisible(false)
          }}
        >
          <FlashcardsStack flashcards={flashcards} />
        </DialogContent>
      </Dialog>
    </>
  )
}
