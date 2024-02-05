import { headers } from 'next/headers'

export const IP = async (): Promise<React.ReactElement> => {
  const ip = await getIp()

  return (
    <div className="rounded bg-gray-100 p-4">
      <h1>your ip: {ip}</h1>
    </div>
  )
}

const getIp = async (): Promise<string> => {
  const forwardedFor = headers().get('x-forwarded-for')
  const realIp = headers().get('x-real-ip')

  headers().forEach((value, key) => {
    console.log(key, value)
  })

  if (forwardedFor) return forwardedFor.split(',')[0]!.trim()

  if (realIp) return realIp.trim()

  return '0.0.0.0'
}
