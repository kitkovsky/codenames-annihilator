import { Suspense } from 'react'

import { UsersList } from '@components/users-list'
import { ChatBot } from '@components/chat-bot'

export default function GeneratePage() {
  return (
    <div>
      <Suspense fallback={<h1>loading users...</h1>}>
        <UsersList />
      </Suspense>
      <Suspense fallback={<h1>loading prompt answer...</h1>}>
        <ChatBot />
      </Suspense>
    </div>
  )
}
