'use client'

import { useEffect, useState } from 'react'

import { cn } from '@utils/cn.utils'
import { type Card } from './board-game-server-wrapper'

export interface BoardGameProps {
  cards: Card[]
  className?: string
}

export const BoardGame = (props: BoardGameProps): React.ReactElement => {
  const { cards, className } = props

  return (
    <div
      className={cn(
        'grid h-fit w-fit grid-cols-5 grid-rows-5 gap-1.5',
        className,
      )}
    >
      {cards.map((card) => (
        <Card
          color={card.color}
          flippedByDefault={card.flippedByDefault}
          idx={card.idx}
          key={card.idx}
        />
      ))}
    </div>
  )
}

const Card = (props: Card): React.ReactElement => {
  const { flippedByDefault, color } = props
  const [flipped, setFlipped] = useState(flippedByDefault)
  const shouldFlip = color !== 'neutral'

  useEffect(() => {
    if (!shouldFlip) return

    const flipInterval = Math.random() * 15000 + 2000

    const timeoutId = setInterval(() => {
      setFlipped((prev) => !prev)
    }, flipInterval)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="relative h-8 w-12 sm:h-9 sm:w-14">
      <div
        className={cn(
          'absolute h-full w-full transition-all duration-1000 [transform-style:preserve-3d]',
          { '[transform:rotateY(180deg)]': flipped },
        )}
      >
        <div className="absolute h-full w-full rounded bg-gray-100 [backface-visibility:hidden]" />
        <div
          className={cn(
            'absolute h-full w-full rounded [transform:rotateY(180deg)] [backface-visibility:hidden]',
            { 'bg-blue': color === 'blue' },
            { 'bg-red': color === 'red' },
          )}
        />
      </div>
    </div>
  )
}
