import * as z from 'zod'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  generateAndSavePromptWithClue,
  getDemoModalVisibility,
  getGenerationsLimitModalVisibility,
} from './actions'
import { useLoadingState } from '@utils/loading-state.utils'

const MAX_PROMPT_WORDS_COUNT = 5

export type UseGeneratorFormReturn = {
  form: ReturnType<typeof useForm<FormValues>>
  onSubmit: (values: FormValues) => void
  MAX_PROMPT_WORDS_COUNT: number
  promptWords: string[]
  setPromptWords: Dispatch<SetStateAction<string[]>>
  onGenerateSubmit: () => Promise<void>
  inputDisabled: boolean
  submitButtonDisabled: boolean
  loading: boolean
  demoModalVisible: boolean
  setDemoModalVisible: Dispatch<SetStateAction<boolean>>
  generationsLimitModalVisible: boolean
  setGenerationsLimitModalVisible: Dispatch<SetStateAction<boolean>>
}

const formSchema = z.object({ promptWord: z.string() })

type FormValues = z.infer<typeof formSchema>

export const useGeneratorForm = (): UseGeneratorFormReturn => {
  const [promptWords, setPromptWords] = useState<string[]>([])
  const [demoModalVisible, setDemoModalVisible] = useState(false)
  const [generationsLimitModalVisible, setGenerationsLimitModalVisible] =
    useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promptWord: '',
    },
  })
  const currentInput = form.watch('promptWord')

  const inputDisabled = promptWords.length >= MAX_PROMPT_WORDS_COUNT
  const submitButtonDisabled = currentInput === '' || inputDisabled

  const onSubmit = (values: FormValues): void => {
    const newPromptWord = values.promptWord

    setPromptWords((prevPromptWords) => [...prevPromptWords, newPromptWord])
    form.reset()
  }

  const _onGenerateSubmit = async (): Promise<void> => {
    const shouldShowDemoModal = await getDemoModalVisibility()
    if (shouldShowDemoModal) {
      setDemoModalVisible(true)
      return
    }

    const shouldShowGenerationsLimitModal =
      await getGenerationsLimitModalVisibility()
    if (shouldShowGenerationsLimitModal) {
      setGenerationsLimitModalVisible(true)
      return
    }

    await generateAndSavePromptWithClue(promptWords)
    setPromptWords([])
  }

  const { loading: generateLoading, wrappedFn: onGenerateSubmit } =
    useLoadingState(_onGenerateSubmit)

  return {
    form,
    onSubmit,
    MAX_PROMPT_WORDS_COUNT,
    promptWords,
    setPromptWords,
    onGenerateSubmit,
    inputDisabled,
    submitButtonDisabled,
    loading: generateLoading || demoModalVisible,
    demoModalVisible,
    setDemoModalVisible,
    generationsLimitModalVisible,
    setGenerationsLimitModalVisible,
  }
}
