import { getServerAuthSession } from '@/server/auth'
import { AuthButton } from '@components/auth-button'
import { Link } from '@components/link'
import Image from 'next/image'

export default async function Home() {
  const session = await getServerAuthSession()

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-6xl font-bold text-green">hello there</h1>

      <Link href="/generate" className="text-3xl">
        generate me some codenames
      </Link>

      <AuthButton session={session} />

      {session?.user?.image && (
        <Image
          src={session.user.image}
          width="320"
          height="320"
          alt="profile picture"
          priority
        />
      )}
    </main>
  )
}
