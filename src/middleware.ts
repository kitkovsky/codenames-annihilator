import { type NextRequest, NextResponse } from 'next/server'

// next-auth uses two different session cookie names in development and production
const DEV_SESSION_COOKIE_NAME = 'authjs.session-token'
const PROD_SESSION_COOKIE_NAME = '__Secure-authjs.session-token'
export const GHOST_USER_ID_COOKIE_NAME = 'ghost_user_id'

export default async function middleware(
  request: NextRequest,
): Promise<NextResponse> {
  const response = NextResponse.next()
  const hasSessionCookie =
    request.cookies.has(DEV_SESSION_COOKIE_NAME) ||
    request.cookies.has(PROD_SESSION_COOKIE_NAME)
  const hasGhostUserIdCookie = request.cookies.has(GHOST_USER_ID_COOKIE_NAME)

  if (!hasSessionCookie && !hasGhostUserIdCookie) {
    const date400DaysFromNow = new Date(Date.now() + 400 * 24 * 60 * 60 * 1000)
    const ghostUserId = crypto.randomUUID()

    // a cookie set from middleware isn't available on the first render pass in server components,
    // so we're setting it in the headers as well and reading from both places in `getServerCurrentUser()`
    response.cookies.set(GHOST_USER_ID_COOKIE_NAME, ghostUserId, {
      expires: date400DaysFromNow,
    })
    response.headers.set(GHOST_USER_ID_COOKIE_NAME, ghostUserId)
  }

  return response
}
