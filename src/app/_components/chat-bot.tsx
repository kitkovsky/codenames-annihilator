// import OpenAI from 'openai'

// import { env } from '@/env'

export const ChatBot = async () => {
  const prompt = 'plant, table'
  const answer = await getCompletion(prompt)

  return (
    <h1>
      {prompt} : {answer}
    </h1>
  )
}

// const rules = [
//   'You are familiar with the card game Codenames. In Codenames, the goal is to come up with a one-word clue that connects multiple words on the board.',
//   'The challenge is to find a word that links the target words in the minds of your teammates without leading them to other words or the words belonging to the opposing team.',
//   "You're about to receive a prompt, which will be a list of words. Your task is to create a list of 5 words. Every one fo these created words has to be related to all the prompt words, in a way that ties them all up.",
//   "I want the output to be a list of 5 words separated by a comma. Make sure that every word you generate is inclusive of all the prompt words, such that there's a clear connotation to every prompt word.",
//   'Make sure there are exactly 5 generated words, no more, no less. The generated words should all be lower case.',
// ]

const getCompletion = async (_prompt: string): Promise<string> => {
  return new Promise((res) => res('foo'))
  // const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY })
  // const completion = await openai.chat.completions.create({
  //   messages: [
  //     ...rules.map((rule) => ({ role: 'system' as const, content: rule })),
  //     { role: 'user', content: 'chair, table' },
  //     { role: 'system', content: 'wood, furniture, legs, kitchen, ikea' },
  //     {
  //       role: 'system',
  //       content:
  //         'Now come up with a new list of 5 words for the incoming prompt.',
  //     },
  //     { role: 'user', content: prompt },
  //   ],
  //   model: 'gpt-4',
  // })

  // return completion.choices[0]?.message.content ?? ''
}
