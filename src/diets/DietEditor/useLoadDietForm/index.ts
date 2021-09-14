import {
  loadFile,
  readFile,
  parseDietForm,
  loadLastOrDefaultDietForm,
  hasMissingFoods,
} from 'persistence'
import { useState } from 'react'
import { delay } from 'general'
import { useFoods } from 'foods'
import useToasts from './useToasts'

function useLoadDietForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [dietForm, setDietForm] = useState(loadLastOrDefaultDietForm)
  const { foodsById } = useFoods()
  const { missingFoodsModalDisclosure, ...toasts } = useToasts()

  async function loadAndReadFile() {
    const file = await loadFile('application/pdf')
    setIsLoading(true)

    const text = await readFile(file)
    await delay(300)

    return [file, text] as const
  }

  async function onLoadFromFile() {
    try {
      const [file, text] = await loadAndReadFile()
      const dietForm = parseDietForm(text, file.name)

      if (hasMissingFoods(dietForm, foodsById)) {
        toasts.showFileImportedWithMissingFoodsToast()
      } else {
        toasts.showFileImportedToast()
      }
      setDietForm(dietForm)
    } catch (error) {
      if (error instanceof DOMException) {
        toasts.showCouldNotLoadFileToast()
      } else if (error instanceof SyntaxError) {
        toasts.showCouldNotParseFileToast()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    onLoadFromFile,
    isLoading,
    dietForm,
    missingFoodsModalDisclosure,
  }
}

export default useLoadDietForm
