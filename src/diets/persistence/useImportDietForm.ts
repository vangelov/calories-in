import { selectFile, readFile } from 'persistence'
import { useFoods } from 'foods'
import { useDietFormActions } from 'diets'
import { hasMissingFoods, parseDietForm } from 'diets/persistence'
import useFileImportError from 'persistence/useImportFileError'
import { useToast } from '@chakra-ui/toast'
import useDietImportErrors from './useDietImportErrors'
import { UseDisclosureReturn } from '@chakra-ui/hooks'

type Params = {
  missingFoodsModalDisclosure: UseDisclosureReturn
}

function useImportDietForm({ missingFoodsModalDisclosure }: Params) {
  const { foodsById } = useFoods()
  const dietFormActions = useDietFormActions()
  const fileImportError = useFileImportError()
  const dietImportErrors = useDietImportErrors({ missingFoodsModalDisclosure })
  const toast = useToast()

  async function onLoadFromFile() {
    const file = await selectFile('application/pdf')

    try {
      const text = await readFile(file)
      const dietForm = parseDietForm(text)

      if (hasMissingFoods(dietForm, foodsById)) {
        dietImportErrors.onMissingFoods()
      } else {
        toast({
          status: 'success',
          position: 'top',
          title: 'Meal plan imported',
          duration: 2000,
          isClosable: true,
        })
      }
      dietFormActions.setDietForm(dietForm)
    } catch (error: any) {
      fileImportError.onError({ error, file })
    }
  }

  return {
    onLoadFromFile,
    missingFoodsModalDisclosure: dietImportErrors.missingFoodsModalDisclosure,
  }
}

export default useImportDietForm
