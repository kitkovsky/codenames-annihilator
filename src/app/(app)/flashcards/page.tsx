import { FlashcardsTable } from './flashcards-table'
import { FlashcardsPracticeModalTrigger } from './flashcards-practice-modal-trigger'

export default function FlashcardsPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold sm:text-4xl">Flashcards</h1>

        <FlashcardsPracticeModalTrigger />
      </div>

      <FlashcardsTable />
    </div>
  )
}
