import { Suspense } from 'react'

import { getServerAuthSession } from '@/server/auth'
import { getUserFlashcards } from '@rpc/flashcards'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import { type Flashcard } from '@/server/db/schema/flashcards'
import {
  flashcardStateBorder,
  flashcardStateToSentenceCase,
} from '@utils/flashcards.utils'
import { cn } from '@utils/cn.utils'
import { Skeleton } from '@components/ui/skeleton'
import { range } from '@utils/array.utils'

const _FlashcardsTable = async (): Promise<React.ReactElement> => {
  const session = await getServerAuthSession()
  const user = session?.user

  if (!user) {
    return <div>TODO: maybe? implement saving to cookies/local storage</div>
  }

  const flashcards = await getUserFlashcards(user.id)

  return (
    <Table>
      <PromptCluesTableHeader />
      <TableBody>
        {flashcards.map((card) => (
          <FlashcardTableRow flashcard={card} key={card.id} />
        ))}
      </TableBody>
    </Table>
  )
}

const PromptCluesTableHeader = (): React.ReactElement => (
  <TableHeader>
    <TableRow>
      <TableHead className="min-w-32 pl-2 sm:pl-4">Prompt</TableHead>
      <TableHead className="px-2 sm:px-4">Clues</TableHead>
      <TableHead className="px-2 sm:px-4">State</TableHead>
    </TableRow>
  </TableHeader>
)

const FlashcardTableRow = (props: {
  flashcard: Flashcard
}): React.ReactElement => {
  const { flashcard } = props

  const promptWords = flashcard.prompt.promptWords
    .map((promptWord) => promptWord.word)
    .join(', ')
  const clueWords = flashcard.clue.clueWords
    .map((clueWord) => clueWord.word)
    .join(', ')

  return (
    <TableRow>
      <TableCell className="pl-2 sm:pl-4">{promptWords}</TableCell>
      <TableCell className="px-2 sm:px-4">{clueWords}</TableCell>
      <TableCell className="px-2 sm:px-4">
        <span
          className={cn(
            'rounded-lg border-2 px-2 py-1 font-medium',
            flashcardStateBorder[flashcard.state],
          )}
        >
          {flashcardStateToSentenceCase(flashcard.state)}
        </span>
      </TableCell>
    </TableRow>
  )
}

const FlashcardsTableSkeleton = (): React.ReactElement => (
  <Table>
    <PromptCluesTableHeader />
    <TableBody>
      {range(5).map((idx) => (
        <TableRow key={idx}>
          <TableCell className="pl-2 sm:pl-4">
            <Skeleton className="h-5 w-20 rounded sm:w-36" />
          </TableCell>
          <TableCell className="px-2 sm:px-4">
            <Skeleton className="h-5 w-36 rounded sm:w-64" />
          </TableCell>
          <TableCell className="px-2 sm:px-4">
            <Skeleton className="h-5 w-8 rounded sm:w-16" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export const FlashcardsTable = (): React.ReactElement => (
  <Suspense fallback={<FlashcardsTableSkeleton />}>
    <_FlashcardsTable />
  </Suspense>
)
