import { Link } from '@components/ui/link'
import { routes } from '@utils/routes.utils'

export default function FAQPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="flex justify-center">
        <article className="prose sm:prose-lg">
          <h2>Why would anyone use this?</h2>
          <p>
            This website was created for people wanting to never again lose a
            game of Codenames. With the use of our proprietary algorithms and
            big brains we've come up with the ideal training plan for becoming a
            Codenames master.
          </p>

          <h2>Is it free?</h2>
          <p>
            You can test out the flow of our app for free (including the{' '}
            <Link variant="underline" href={routes.generator()}>
              generator
            </Link>{' '}
            and{' '}
            <Link variant="underline" href={routes.flashcards()}>
              flashcards
            </Link>{' '}
            system) but the words you get back from the generator will be
            random, unless you sign in. This is to prevent malevolent use of our
            services.
          </p>

          <h2>Will I become the very best like no one ever was?</h2>
          <p>Absolutely.</p>
        </article>
      </div>
    </div>
  )
}
