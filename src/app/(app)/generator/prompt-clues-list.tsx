import { Suspense } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import { getServerCurrentUser } from '@/server/auth'
import { isEmpty, range } from '@utils/array.utils'
import { getUserPromptsFromDB, getUserPromptsFromCookie } from '@rpc/prompts'
import type { PromptWithClue } from '@/server/db/schema/prompts'
import { Skeleton } from '@components/ui/skeleton'
import { FREE_GENERATIONS_LIMIT } from '@consts/generations.consts'

const _PromptCluesList = async (): Promise<React.ReactElement> => {
  const user = await getServerCurrentUser()
  const userId = user?.id
  const userPrompts = userId
    ? await getUserPromptsFromDB(userId)
    : getUserPromptsFromCookie()

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 py-1 text-lg sm:p-2">
        <h1 className="text-sm font-semibold sm:text-base">
          Recent generations
        </h1>
        <span className="w-fit rounded-md bg-light-gray px-2 py-1 text-sm font-semibold text-black-100">
          Generations limit: {userPrompts.length}/{FREE_GENERATIONS_LIMIT}
        </span>
      </div>

      {isEmpty(userPrompts) && (
        <div className="mt-6 flex justify-center">
          <span className="text-sm text-muted-foreground">
            A list of your recent generations, looking empty
          </span>
        </div>
      )}

      {!isEmpty(userPrompts) && (
        <Table>
          <PromptCluesTableHeader />
          <TableBody>
            {userPrompts.map((prompt) => (
              <PromptCluesTableRow prompt={prompt} key={prompt.id} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

const PromptCluesListSkeleton = (): React.ReactElement => (
  <>
    <div className="mb-2 flex justify-between p-2 text-lg">
      <h1 className="font-semibold">Recent generations</h1>
      <Skeleton className="h-7 w-40 rounded-md" />
    </div>

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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
)

const PromptCluesTableHeader = (): React.ReactElement => (
  <TableHeader>
    <TableRow>
      <TableHead className="min-w-32 pl-2 sm:pl-4">Prompt</TableHead>
      <TableHead className="px-2 sm:px-4">Clues</TableHead>
    </TableRow>
  </TableHeader>
)

const PromptCluesTableRow = (props: {
  prompt: PromptWithClue
}): React.ReactElement => {
  const { prompt } = props

  const promptWords = prompt.promptWords
    .map((promptWord) => promptWord.word)
    .join(', ')
  const clueWords = prompt.clue.clueWords
    .map((clueWord) => clueWord.word)
    .join(', ')

  return (
    <TableRow>
      <TableCell className="pl-2 sm:pl-4">{promptWords}</TableCell>
      <TableCell className="px-2 sm:px-4">{clueWords}</TableCell>
    </TableRow>
  )
}

export const PromptCluesList = (): React.ReactElement => (
  <Suspense fallback={<PromptCluesListSkeleton />}>
    <_PromptCluesList />
  </Suspense>
)
