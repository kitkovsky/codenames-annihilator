'use client'

import type { Dispatch, SetStateAction } from 'react'

import { Button } from '@components/ui/button'
import { Dialog, DialogContent } from '@components/ui/dialog'
import { saveModalShownCookie } from './actions'

export interface ModalProps {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  submitForm: () => Promise<void>
}

export const DemoVersionModal = (props: ModalProps): React.ReactElement => {
  const { visible, setVisible, submitForm } = props

  const onGotItClick = async (): Promise<void> => {
    saveModalShownCookie()
    setVisible(false)
    await submitForm()
  }

  return (
    <Dialog open={visible}>
      <DialogContent className="p-4" customClose>
        <h1 className="text-lg font-medium">Heads-up!</h1>
        <p className="text-light-gray">
          This is a demo version of the generator. Unless you sign in, the words
          will be generated randomly, instead of using our AI algorithm.
        </p>
        <Button
          onClick={() => onGotItClick()}
          className="text-base font-medium"
        >
          Got it
        </Button>
      </DialogContent>
    </Dialog>
  )
}
