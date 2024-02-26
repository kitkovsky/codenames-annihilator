import { type NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE_NAME = 'authjs.session-token'
export const GHOST_USER_ID_COOKIE_NAME = 'ghost_user_id'

export default async function middleware(
  request: NextRequest,
): Promise<NextResponse> {
  const response = NextResponse.next()
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME)
  const hasGhostUserIdCookie = request.cookies.has(GHOST_USER_ID_COOKIE_NAME)

  if (!hasSessionCookie && !hasGhostUserIdCookie) {
    const uuidv4 = (await import('uuid')).v4
    const date400DaysFromNow = new Date(Date.now() + 400 * 24 * 60 * 60 * 1000)
    const ghostUserId = uuidv4()

    // a cookie set from middleware isn't available on the first render pass in server components,
    // so we're setting it in the headers as well and reading from both places in `getServerCurrentUser()`
    response.cookies.set(GHOST_USER_ID_COOKIE_NAME, ghostUserId, {
      expires: date400DaysFromNow,
    })
    response.headers.set(GHOST_USER_ID_COOKIE_NAME, ghostUserId)
  }

  return response
}
