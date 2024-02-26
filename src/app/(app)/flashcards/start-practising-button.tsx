'use client'

import { useState } from 'react'

import { Dialog, DialogContent } from '@components/ui/dialog'
import { Button } from '@components/ui/button'
import { revalidateFlashcardsPath } from './actions'

export interface StartPractisingButtonProps {
  children: React.ReactNode
}

export const StartPractisingButton = (
  props: StartPractisingButtonProps,
): React.ReactElement => {
  const { children } = props
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        className="text-sm font-semibold sm:text-base"
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
          {children}
        </DialogContent>
      </Dialog>
    </>
  )
}
