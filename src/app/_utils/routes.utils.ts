export const SIGN_IN_REDIRECT_PARAM = 'redirect-url'

export const routes = {
  root: (): string => '/',
  generator: (): string => '/generator',
  signIn: (redirectUrl: string): string =>
    `/sign-in?${SIGN_IN_REDIRECT_PARAM}=${encodeURIComponent(redirectUrl)}`,
}
