import { api } from '@/trpc/server'
import { isEmpty } from '@utils/array.utils'

export const UsersList = async () => {
  const users = await api.users.getAll.query()

  return (
    <div>
      {isEmpty(users) && <h1>no users</h1>}

      {users.map((user) => (
        <div className="flex gap-3" key={user.id}>
          <h1>{user.name}</h1>
          <h2>
            {new Date(user.createdAt).toLocaleString('pl-PL', {
              timeZone: 'UTC',
            })}
          </h2>
        </div>
      ))}
    </div>
  )
}
