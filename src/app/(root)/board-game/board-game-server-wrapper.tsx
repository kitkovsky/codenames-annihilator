import { Suspense } from 'react'
import { unstable_noStore } from 'next/cache'

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

// NOTE: we want this component to have randomized cards on every request,
// so we opt it out of the caching that comes from partial prerendering with unstable_noStore()
// the <Suspense> is only needed to mark the boundary between the static shell and the dynamic content
const _BoardGameServerWrapper = (props: BoardGameProps): React.ReactElement => {
  unstable_noStore()

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

export const BoardGameServerWrapper = (
  props: BoardGameProps,
): React.ReactElement => (
  <Suspense>
    <_BoardGameServerWrapper {...props} />
  </Suspense>
)
