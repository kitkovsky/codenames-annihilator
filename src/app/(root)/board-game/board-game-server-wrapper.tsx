import { range, uniqueRandomArray } from '@utils/array.utils'
import { BoardGame } from './board-game'

const BLUE_CARDS_COUNT = 8
const RED_CARDS_COUNT = 7
const ALL_CARDS_COUNT = 25

export type Card = {
  color: 'blue' | 'red' | 'neutral'
  flippedByDefault: boolean
  idx: number
}

export interface BoardGameProps {
  className?: string
}

// NOTE: this server component wrapper is here to generate the random info
// of cards only on the server, so we don't get a hydration mismatch on the client
// if they were generated in a 'use client' componenet
export const BoardGameServerWrapper = (
  props: BoardGameProps,
): React.ReactElement => {
  const { className } = props
  const randomCards = generateRandomCards()

  return <BoardGame cards={randomCards} className={className} />
}

const generateRandomCards = (): Card[] => {
  const blueCardsIdxs = uniqueRandomArray({
    length: BLUE_CARDS_COUNT,
    range: { start: 0, end: ALL_CARDS_COUNT },
  })
  const redCardsIdxs = uniqueRandomArray({
    length: RED_CARDS_COUNT,
    range: { start: 0, end: ALL_CARDS_COUNT },
    distinctFrom: blueCardsIdxs,
  })

  const cards: Card[] = range(ALL_CARDS_COUNT).map((idx) => {
    let color: Card['color']
    if (blueCardsIdxs.includes(idx)) color = 'blue'
    else if (redCardsIdxs.includes(idx)) color = 'red'
    else color = 'neutral'
    const flippedByDefault = color != 'neutral' && Math.random() > 0.5

    return {
      color,
      flippedByDefault,
      idx,
    }
  })

  return cards
}
