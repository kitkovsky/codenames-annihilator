'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { XMarkIcon } from '@heroicons/react/16/solid'

import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useGeneratorForm } from '@/app/generator/_generator-form/use-generator-form'
import { cn } from '@utils/cn.utils'
import { isEmpty } from '@utils/array.utils'

export interface GeneratorFormProps {
  className?: string
}

export const GeneratorForm = (props: GeneratorFormProps) => {
  const { className } = props

  const {
    form,
    onSubmit,
    promptWords,
    setPromptWords,
    MAX_PROMPT_WORDS_COUNT,
    onGenerateSubmit,
    inputDisabled,
    submitButtonDisabled,
  } = useGeneratorForm()
  const [animationParent] = useAutoAnimate({ duration: 150 })

  return (
    <div
      className={cn('flex flex-col justify-between gap-3 sm:gap-4', className)}
    >
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 sm:gap-4"
          >
            <FormField
              control={form.control}
              name="promptWord"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder={
                        inputDisabled
                          ? 'List full'
                          : `Prompt word ${
                              promptWords.length + 1
                            }/${MAX_PROMPT_WORDS_COUNT}`
                      }
                      {...field}
                      disabled={inputDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={submitButtonDisabled}
              className="transition-all"
            >
              Add word
            </Button>
          </form>
        </Form>

        <div className="relative mt-3 min-h-12 rounded-md bg-black-80 p-2 sm:mt-4">
          {isEmpty(promptWords) && (
            <span className="pointer-events-none absolute left-4 top-6 -translate-y-1/2 text-sm text-muted-foreground">
              Your words will appear here
            </span>
          )}
          <ul className="flex flex-wrap gap-3" ref={animationParent}>
            {promptWords.map((word) => (
              <li
                // NOTE: don't remove 'max-h-8', it's needed for auto-animate to behave well with flexbox
                className="group relative max-h-8 w-fit rounded bg-white px-4 py-1 font-medium text-black-90"
                key={word}
              >
                <span>{word}</span>
                <button
                  onClick={() =>
                    setPromptWords((prev) => prev.filter((w) => w !== word))
                  }
                  className="absolute right-0 top-0 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-destructive opacity-0 transition-all group-hover:opacity-100"
                >
                  <XMarkIcon className="h-4 w-4 text-destructive-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3" ref={animationParent}>
        {promptWords.length < 2 && (
          <span className="text-xs text-muted-foreground/75 sm:text-sm">
            (Include at least 2 prompt words)
          </span>
        )}

        <Button
          onClick={onGenerateSubmit}
          disabled={promptWords.length < 2}
          className="w-full transition-all"
        >
          Generate
        </Button>
      </div>
    </div>
  )
}
