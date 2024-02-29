'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { type Flashcard } from '@/server/db/schema/flashcards'
import { FlashcardCard } from './flashcard-card'
import { Button } from '@components/ui/button'
import { revalidateFlashcardsPath } from '../actions'

const CARD_OFFSET = 10
const CARD_SCALE_FACTOR = 0.06

export interface FlashcardsStackProps {
  flashcards: Flashcard[]
  closeModal: () => void
}

export const FlashcardsStack = (
  props: FlashcardsStackProps,
): React.ReactElement => {
  const { flashcards, closeModal } = props
  const [animatePop, setAnimatePop] = useState(false)
  const [animateSlide, setAnimateSlide] = useState(false)

  const removeTopCard = (): void =>
    setCards((prevCards) => {
      const newArray = [...prevCards]
      newArray.shift()
      return newArray
    })

  const animateOut = async (): Promise<void> => {
    setAnimatePop(true)
    await new Promise((resolve) => setTimeout(resolve, 200))
    setAnimateSlide(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  const handleAnimatingOut = async (): Promise<void> => {
    await animateOut()
    removeTopCard()
    setAnimatePop(false)
    setAnimateSlide(false)
  }

  const flashcardsCards = flashcards.map((flashcard) => ({
    id: flashcard.id,
    content: (
      <FlashcardCard
        flashcard={flashcard}
        animateOut={() => handleAnimatingOut()}
        key={flashcard.id}
      />
    ),
  }))
  flashcardsCards.push({
    id: 123,
    content: (
      <div className="flex h-full flex-col justify-between">
        <div className="p-4">
          <h2 className="pb-3 text-2xl font-semibold">Good job!</h2>
          <h3 className="text-lighter-gray">
            You've sorted through all the cards. You really do want to be the
            best at Codenames, don't you?
          </h3>
        </div>

        <Button
          onClick={() => {
            revalidateFlashcardsPath()
            closeModal()
          }}
          variant="ghost"
          className="min-h-10 w-full rounded rounded-t-none border-2 border-x-0 border-b-0 border-mint-green text-base font-semibold"
        >
          Close
        </Button>
      </div>
    ),
  })
  const [cards, setCards] = useState(flashcardsCards)

  return (
    <ul className="relative h-60 w-[calc(100vw-32px)] sm:w-96">
      {cards.map((card, idx) => {
        const isTopCard = idx === 0
        const shouldAnimateOut = animatePop && isTopCard
        const shouldAnimateSlide = animateSlide && isTopCard

        const top = -(idx * CARD_OFFSET)
        const scale = shouldAnimateOut ? 1.05 : 1 - idx * CARD_SCALE_FACTOR
        const zIndex = cards.length - idx
        const rotate = shouldAnimateOut ? 5 : 0
        const left = shouldAnimateSlide ? '100%' : 0
        const opacity = shouldAnimateSlide ? 0 : 1

        return (
          <motion.li
            key={card.id}
            className="absolute h-60 w-full origin-top rounded border border-gray-100 bg-black-90 sm:w-96"
            animate={{
              top,
              scale,
              zIndex,
              rotate,
              left,
              opacity,
            }}
          >
            {card.content}
          </motion.li>
        )
      })}
    </ul>
  )
}
