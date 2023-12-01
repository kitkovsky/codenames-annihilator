import { db } from '@/server/db'
import { isEmpty } from '@utils/array.utils'

export const UsersList = async () => {
  const users = await db.query.users.findMany()

  return (
    <div>
      {isEmpty(users) && <h1>no users</h1>}

      {users.map((user) => (
        <div className="flex gap-3" key={user.id}>
          <h1>{user.name}</h1>
        </div>
      ))}
    </div>
  )
}
