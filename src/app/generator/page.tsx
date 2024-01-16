import { Suspense } from 'react'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog'
import { GeneratorForm } from '@components/generator-form'
import {
  PromptConnectorsList,
  PromptConnectorsListSkeleton,
} from '@components/prompt-connectors-list'

export default function GeneratorPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 sm:pt-4 lg:px-8 lg:pt-8">
        <div className="relative flex flex-col items-center rounded-md border border-gray-100 p-2 sm:p-4">
          <h1 className="mb-4 text-xl font-semibold sm:mb-8 sm:text-3xl">
            Connectors generator
          </h1>

          <Dialog>
            <DialogTrigger className="sm:hidden">
              <InformationCircleIcon className="absolute right-1.5 top-1.5 h-5 w-5 text-light-gray" />
            </DialogTrigger>
            <DialogContent className="p-4">
              <HowDoesItWorkList />
            </DialogContent>
          </Dialog>

          <div className="grid w-full grid-cols-5">
            <GeneratorForm className="col-span-5 sm:col-span-3" />

            <div className="hidden sm:col-span-2 sm:flex">
              <div className="mx-4 h-full w-px bg-gray-100" />

              <HowDoesItWorkList />
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 h-px w-full bg-gray-100" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<PromptConnectorsListSkeleton />}>
          <PromptConnectorsList />
        </Suspense>
      </div>
    </>
  )
}

const HowDoesItWorkList = () => (
  <div className="flex flex-col gap-2">
    <h2 className="text-lg font-medium">How does it work?</h2>
    <ul className="flex flex-col gap-0.5 text-light-gray">
      <li>Create a list of 2 to 5 prompt words.</li>
      <li>These will be analyzed to generate a list of 5 connecting words.</li>
      <li>
        <span className="font-medium text-primary">Annihilate </span>
        your opponents.
      </li>
    </ul>
  </div>
)
