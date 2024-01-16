import OpenAI from 'openai'

import { range } from '@utils/array.utils'
import { env } from '@/env'
import type {
  ConnectorWord,
  ConnectorWithConnectorWords,
} from '@/server/db/schema/connectors'

export const createLocalConnectorWithConnectorWords = async (
  promptId: number,
): Promise<ConnectorWithConnectorWords> => {
  const connectorId = Math.floor(Math.random() * 1_000_000)
  const rawConnectorWords = await getConnectorWords({ source: 'random' })
  const connectorWords: ConnectorWord[] = rawConnectorWords.map((word) => ({
    id: Math.floor(Math.random() * 1_000_000),
    connectorId,
    word,
  }))
  const connectorWithConnectorWords: ConnectorWithConnectorWords = {
    id: connectorId,
    createdAt: String(new Date()),
    promptId,
    connectorWords,
  }

  return connectorWithConnectorWords
}

type GetConnectorWordsArgs =
  | { source: 'random' }
  | { source: 'openAI'; promptWords: string }

export const getConnectorWords = async (
  args: GetConnectorWordsArgs,
): Promise<string[]> => {
  const { source } = args
  const connectorWords: string[] = []

  if (source === 'random') {
    await Promise.all(
      range(5).map(async () => {
        const res = await fetch(
          'https://api.api-ninjas.com/v1/randomword?type=noun',
          {
            headers: {
              'X-Api-Key': env.API_NINJAS_API_KEY,
            },
          },
        )

        const json = (await res.json()) as { word: string }
        connectorWords.push(json.word)
      }),
    )
  }

  if (source === 'openAI') {
    const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY })

    const completion = await openai.chat.completions.create({
      messages: [
        ...openAIRules.map((rule) => ({
          role: 'system' as const,
          content: rule,
        })),
        { role: 'user', content: 'chair, table' },
        { role: 'system', content: 'wood, furniture, legs, kitchen, ikea' },
        {
          role: 'system',
          content:
            'Now come up with a new list of 5 words for the incoming prompt.',
        },
        { role: 'user', content: args.promptWords },
      ],
      model: 'gpt-4',
    })

    const responseWords = completion.choices[0]?.message.content

    // because the openAI response words can be separated by a comma or a space - even though we requested commas -
    // we check for both cases
    if (responseWords?.includes(',')) {
      // using a regex to remove all space characters, instead of splitting by ', '
      // because the response words can be separated by ', ' or ','
      responseWords
        ?.split(',')
        .map((word) => word.replace(/\s/g, ''))
        .forEach((word) => connectorWords.push(word))
    }

    if (!responseWords?.includes(',')) {
      responseWords?.split(' ').forEach((word) => connectorWords.push(word))
    }
  }

  return connectorWords
}

const openAIRules = [
  'You are familiar with the card game Codenames. In Codenames, the goal is to come up with a one-word clue that connects multiple words on the board.',
  'The challenge is to find a word that links the target words in the minds of your teammates without leading them to other words or the words belonging to the opposing team.',
  "You're about to receive a prompt, which will be a list of words. Your task is to create a list of 5 words. Every one fo these created words has to be related to all the prompt words, in a way that ties them all up.",
  "I want the output to be a list of 5 words separated by a comma. Make sure that every word you generate is inclusive of all the prompt words, such that there's a clear connotation to every prompt word.",
  'Make sure there are exactly 5 generated words, no more, no less. The generated words should all be lower case.',
]
