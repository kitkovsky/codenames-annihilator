import { Suspense } from 'react'

import { UsersList } from '@components/users-list'

export default function GeneratePage() {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <UsersList />
    </Suspense>
  )
}
