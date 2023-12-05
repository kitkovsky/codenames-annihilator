import { db } from '@/server/db'
import { isEmpty } from '@utils/array.utils'

const getUsers = async () => {
  const users = await db.query.users.findMany({
    with: {
      prompts: {
        with: {
          promptWords: true,
          connector: {
            with: {
              connectorWords: true,
            },
          },
        },
      },
    },
  })

  return users
}

type Prompt = Awaited<ReturnType<typeof getUsers>>[number]['prompts'][number]

export const UsersList = async () => {
  const users = await getUsers()

  return (
    <div>
      {isEmpty(users) && <h1>no users</h1>}

      {users.map((user) => (
        <div className="flex gap-3" key={user.id}>
          <h1>{user.name}</h1>

          {user.prompts.map((prompt) => (
            <FullPrompt prompt={prompt} />
          ))}
        </div>
      ))}
    </div>
  )
}

const FullPrompt = ({ prompt }: { prompt: Prompt }) => {
  const promptWords = prompt.promptWords
    .map((promptWord) => promptWord.word)
    .join(', ')
  const connectorWords = prompt.connector.connectorWords
    .map((connectorWord) => connectorWord.word)
    .join(', ')

  return (
    <div className="flex gap-3">
      <h1>
        {promptWords} {'->'} {connectorWords}
      </h1>
    </div>
  )
}
