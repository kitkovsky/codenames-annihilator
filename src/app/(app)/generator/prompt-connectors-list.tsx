import { Suspense } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import { getServerAuthSession } from '@/server/auth'
import { isEmpty, range } from '@utils/array.utils'
import { getUserPromptsFromDB, getUserPromptsFromCookie } from '@rpc/prompts'
import type { PromptWithConnector } from '@/server/db/schema/prompts'
import { Skeleton } from '@components/ui/skeleton'

const FREE_GENERATIONS_LIMIT = 5

const _PromptConnectorsList = async (): Promise<React.ReactElement> => {
  const session = await getServerAuthSession()
  const userId = session?.user.id
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
            A list of your recent searches, looking empty
          </span>
        </div>
      )}

      {!isEmpty(userPrompts) && (
        <Table>
          <PromptConnectorsTableHeader />
          <TableBody>
            {userPrompts.map((prompt) => (
              <PromptConnectorsTableRow prompt={prompt} key={prompt.id} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

const PromptConnectorsListSkeleton = (): React.ReactElement => (
  <>
    <div className="mb-2 flex justify-between p-2 text-lg">
      <h1 className="font-semibold">Recent generations</h1>
      <Skeleton className="h-7 w-40 rounded-md" />
    </div>

    <Table>
      <PromptConnectorsTableHeader />
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

const PromptConnectorsTableHeader = (): React.ReactElement => (
  <TableHeader>
    <TableRow>
      <TableHead className="min-w-32 pl-2 sm:pl-4">Prompt</TableHead>
      <TableHead className="px-2 sm:px-4">Connectors</TableHead>
    </TableRow>
  </TableHeader>
)

const PromptConnectorsTableRow = (props: {
  prompt: PromptWithConnector
}): React.ReactElement => {
  const { prompt } = props

  const promptWords = prompt.promptWords
    .map((promptWord) => promptWord.word)
    .join(', ')
  const connectorWords = prompt.connector.connectorWords
    .map((connectorWord) => connectorWord.word)
    .join(', ')

  return (
    <TableRow>
      <TableCell className="pl-2 sm:pl-4">{promptWords}</TableCell>
      <TableCell className="px-2 sm:px-4">{connectorWords}</TableCell>
    </TableRow>
  )
}

export const PromptConnectorsList = (): React.ReactElement => (
  <Suspense fallback={<PromptConnectorsListSkeleton />}>
    <_PromptConnectorsList />
  </Suspense>
)
