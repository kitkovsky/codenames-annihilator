export const SIGN_IN_REDIRECT_PARAM = 'redirect-url'

export const routes = {
  faq: (): string => '/faq',
  flashcards: (): string => '/flashcards',
  generator: (): string => '/generator',
  root: (): string => '/',
  signIn: (redirectUrl: string): string =>
    `/sign-in?${SIGN_IN_REDIRECT_PARAM}=${encodeURIComponent(redirectUrl)}`,
  termsOfService: (): string => '/terms-of-service',
}
