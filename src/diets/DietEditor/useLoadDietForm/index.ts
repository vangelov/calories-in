import {
  loadFile,
  readFile,
  parseDietForm,
  loadLastOrDefaultDietForm,
  hasMissingFoods,
} from 'persistence'
import { useRef, useState } from 'react'
import { delay } from 'general'
import { useDisclosure } from '@chakra-ui/hooks'
import { DietForm } from 'diets'
import { useFoods } from 'foods'
import useToasts from './useToasts'

function useLoadDietForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [dietForm, setDietForm] = useState(loadLastOrDefaultDietForm)
  const missingFoodsModal = useDisclosure()
  const pendingDietFormRef = useRef<DietForm>()
  const { foodsById } = useFoods()
  const toasts = useToasts()

  async function loadAndReadFile() {
    const file = await loadFile('application/pdf')
    setIsLoading(true)

    const text = await readFile(file)
    await delay(300)

    return [file, text] as const
  }

  async function onLoadFromFile() {
    try {
      pendingDietFormRef.current = undefined
      const [file, text] = await loadAndReadFile()
      const dietForm = parseDietForm(text, file.name)

      if (hasMissingFoods(dietForm, foodsById)) {
        pendingDietFormRef.current = dietForm
        missingFoodsModal.onOpen()
      } else {
        setDietForm(dietForm)

        toasts.showFileImportedToast()
      }
    } catch (error) {
      if (error instanceof DOMException) {
        toasts.showCouldNotLoadFileToast()
      } else if (error instanceof SyntaxError) {
        toasts.showCouldNotParseFileToast()
      }
    } finally {
      if (!pendingDietFormRef.current) {
        setIsLoading(false)
      }
    }
  }

  function onMissingFoodsModalConfirm() {
    setIsLoading(false)
    missingFoodsModal.onClose()

    if (pendingDietFormRef.current) {
      setDietForm(pendingDietFormRef.current)
      toasts.showFileImportedToast()
    }
  }

  function onMissingFoodsModalCancel() {
    setIsLoading(false)
    missingFoodsModal.onClose()
  }

  return {
    onLoadFromFile,
    isLoading,
    dietForm,
    missingFoodsModal,
    onMissingFoodsModalConfirm,
    onMissingFoodsModalCancel,
  }
}

export default useLoadDietForm
