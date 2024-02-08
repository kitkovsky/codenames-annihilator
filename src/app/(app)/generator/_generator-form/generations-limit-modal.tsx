'use client'

import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@components/ui/button'
import { Dialog, DialogContent } from '@components/ui/dialog'

export interface ModalProps {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

export const GenerationsLimitModal = (
  props: ModalProps,
): React.ReactElement => {
  const { visible, setVisible } = props
  const router = useRouter()

  const onUpgradePlanClick = (): void =>
    router.push('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

  return (
    <Dialog open={visible}>
      <DialogContent
        className="p-4"
        onInteractOutside={() => setVisible(false)}
        onCloseClick={() => setVisible(false)}
      >
        <h1 className="text-lg font-medium">Limit reached!</h1>
        <p className="text-light-gray">
          You've reached the generations limit for your current plan. Upgrade to
          continue generating.
        </p>
        <Button
          onClick={() => onUpgradePlanClick()}
          className="text-base font-medium"
        >
          Upgrade your plan
        </Button>
      </DialogContent>
    </Dialog>
  )
}
