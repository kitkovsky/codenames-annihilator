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

const _PromptConnectorsList = async (): Promise<React.ReactElement> => {
  const session = await getServerAuthSession()
  const userId = session?.user.id
  const userPrompts = userId
    ? await getUserPromptsFromDB(userId)
    : getUserPromptsFromCookie()

  return (
    <>
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
  <Table>
    <PromptConnectorsTableHeader />
    <TableBody>
      {range(5).map(() => (
        <TableRow>
          <TableCell>
            <Skeleton className="h-5 w-36 rounded" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-64 rounded" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
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
