import { db } from '@/server/db'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import { prompts } from '@/server/db/schema/prompts'
import { getServerAuthSession } from '@/server/auth'
import { isEmpty } from '@utils/array.utils'

type PromptWithWordsWithConnectors = Awaited<
  ReturnType<typeof getUserPromptsFromDb>
>[number]

export const PromptConnectorsList = async () => {
  const session = await getServerAuthSession()
  const userId = session?.user.id
  const userPrompts = userId
    ? await getUserPromptsFromDb(userId)
    : getUserPromptsFromCookie()

  return (
    <>
      {isEmpty(userPrompts) && (
        <div className="flex justify-center">
          <span className="text-sm text-muted-foreground">
            A list of your recent searches, looking empty
          </span>
        </div>
      )}

      {!isEmpty(userPrompts) && (
        <Table className="caption-top">
          <TableHeader>
            <TableRow>
              <TableHead>Prompt</TableHead>
              <TableHead>Connectors</TableHead>
            </TableRow>
          </TableHeader>
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

const PromptConnectorsTableRow = (props: {
  prompt: PromptWithWordsWithConnectors
}) => {
  const { prompt } = props
  const promptWords = prompt.promptWords
    .map((promptWord) => promptWord.word)
    .join(', ')
  console.log(prompt)
  // const connectorWords = prompt.connector.connectorWords
  //   .map((connectorWord) => connectorWord.word)
  //   .join(', ')

  return (
    <TableRow>
      <TableCell>{promptWords}</TableCell>
      <TableCell>{1}</TableCell>
    </TableRow>
  )
}

const getUserPromptsFromDb = async (userId: string) => {
  const userPrompts = await db.query.prompts.findMany({
    with: {
      promptWords: true,
      connector: {
        with: {
          connectorWords: true,
        },
      },
    },
    where: eq(prompts.authorId, userId),
  })

  return userPrompts
}

const getUserPromptsFromCookie = (): PromptWithWordsWithConnectors[] => {
  const cookieStore = cookies()
  const prompts = cookieStore.get('prompts')?.value

  return prompts
    ? ([JSON.parse(prompts)] as PromptWithWordsWithConnectors[])
    : []
}
