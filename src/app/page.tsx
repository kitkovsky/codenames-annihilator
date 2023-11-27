import { Link } from '@components/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-6xl font-bold text-green">hello there</h1>

      <Link href="/generate" className="text-3xl">
        generate me some codenames
      </Link>
    </main>
  )
}
