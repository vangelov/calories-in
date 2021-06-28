import { useOneTimeCheck } from 'general/oneTimeCheck'
import { useUndoRedoMethods } from 'general/undoRedo'
import { VariantsFieldArray } from '../useVariantsFieldArray'
import {
  getVariantForm,
  getInsertVariantFormAnimationKey,
} from '../variantForm'

type Props = {
  variantsFieldArray: VariantsFieldArray
}

function useAppendVariantForm({ variantsFieldArray }: Props) {
  const { saveLastChange } = useUndoRedoMethods()
  const oneTimeCheck = useOneTimeCheck()

  function onAppend(name: string) {
    const newVariantForm = getVariantForm(name)
    const countBeforeAdd = variantsFieldArray.variantsFields.length - 1

    oneTimeCheck.set(getInsertVariantFormAnimationKey(newVariantForm.fieldId))

    variantsFieldArray.appendVariantForm(newVariantForm)
    variantsFieldArray.setSelectedVariantFormIndex(countBeforeAdd + 1)

    saveLastChange()
  }

  return {
    onAppend,
  }
}

export default useAppendVariantForm
