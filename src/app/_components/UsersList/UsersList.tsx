'use client'

import type { FormEvent } from 'react'

import { trpc } from '@/trpc/client'
import { isEmpty } from '@/app/_utils/array.utils'

export const UsersList = (): React.ReactNode => {
  const { isLoading, error, data: users, refetch } = trpc.getUsers.useQuery()
  const addUser = trpc.addUser.useMutation({ onSettled: () => refetch() })
  const deleteUser = trpc.deleteUser.useMutation({ onSettled: () => refetch() })

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    //@ts-expect-error ignore
    addUser.mutate({ name: e.currentTarget[0].value as string })
  }

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {isEmpty(users) && <div>No users</div>}

      {users.map((user) => (
        <div className="flex gap-4" key={user.id}>
          <h1 key={user.id}>{user.name}</h1>
          <button onClick={() => deleteUser.mutate({ id: user.id })}>x</button>
        </div>
      ))}

      <form action="" onSubmit={handleSubmit}>
        <input type="text" className="text-black" />
        <button>add user</button>
      </form>
    </div>
  )
}
