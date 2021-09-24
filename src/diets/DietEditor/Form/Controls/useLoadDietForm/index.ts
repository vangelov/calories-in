import {
  selectFile,
  readFile,
  parseDietForm,
  hasMissingFoods,
} from 'persistence'
import { useFoods } from 'foods'
import useToasts from './useToasts'
import { useDietFormActions } from 'diets'

function useLoadDietForm() {
  const { foodsById } = useFoods()
  const { missingFoodsModalDisclosure, ...toasts } = useToasts()
  const dietFormActions = useDietFormActions()

  async function onLoadFromFile() {
    const file = await selectFile('application/pdf')

    try {
      const text = await readFile(file)
      const dietForm = parseDietForm(text)

      if (hasMissingFoods(dietForm, foodsById)) {
        toasts.showFileImportedWithMissingFoodsToast()
      } else {
        toasts.showFileImportedToast()
      }

      dietFormActions.setDietForm(dietForm)
    } catch (error) {
      if (error instanceof DOMException) {
        toasts.showCouldNotLoadFileToast(file)
      } else if (error instanceof SyntaxError) {
        toasts.showCouldNotParseFileToast(file)
      } else {
        toasts.showErrorToast(error)
      }
    }
  }

  return {
    onLoadFromFile,

    missingFoodsModalDisclosure,
  }
}

export default useLoadDietForm
