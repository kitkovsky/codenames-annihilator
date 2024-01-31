import { Header } from '@components/layout/header'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
