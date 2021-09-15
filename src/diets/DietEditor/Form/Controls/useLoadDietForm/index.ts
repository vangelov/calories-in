import { loadFile, readFile, parseDietForm, hasMissingFoods } from 'persistence'
import { useFoods } from 'foods'
import useToasts from './useToasts'
import { useDietFormActions } from 'diets'

function useLoadDietForm() {
  const { foodsById } = useFoods()
  const { missingFoodsModalDisclosure, ...toasts } = useToasts()
  const dietFormActions = useDietFormActions()

  async function loadAndReadFile() {
    const file = await loadFile('application/pdf')
    const text = await readFile(file)

    return [file, text] as const
  }

  async function onLoadFromFile() {
    try {
      const [, text] = await loadAndReadFile()
      const dietForm = parseDietForm(text)

      if (hasMissingFoods(dietForm, foodsById)) {
        toasts.showFileImportedWithMissingFoodsToast()
      } else {
        toasts.showFileImportedToast()
      }

      dietFormActions.setDietForm(dietForm)
    } catch (error) {
      if (error instanceof DOMException) {
        toasts.showCouldNotLoadFileToast()
      } else if (error instanceof SyntaxError) {
        toasts.showCouldNotParseFileToast()
      }
    }
  }

  return {
    onLoadFromFile,

    missingFoodsModalDisclosure,
  }
}

export default useLoadDietForm
