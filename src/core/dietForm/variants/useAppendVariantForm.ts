import { useOneTimeCheck } from 'core/OneTimeCheckProvider'
import { useUndoRedoMethods } from 'core/undoRedo'
import { VariantsFieldArray } from './useVariantsFieldArray'
import { getVariantForm, getInsertVariantFormAnimationKey } from './variantForm'

type Props = {
  variantsFieldArray: VariantsFieldArray
}

function useAppendVariantForm({ variantsFieldArray }: Props) {
  const { saveLastChange } = useUndoRedoMethods()
  const oneTimeCheck = useOneTimeCheck()

  function onAppend(name: string) {
    const newVariantForm = getVariantForm(name)
    const countBeforeAdd = variantsFieldArray.variantsFields.length - 1

    const animationKey = getInsertVariantFormAnimationKey(
      newVariantForm.fieldId
    )
    oneTimeCheck.set(animationKey)

    variantsFieldArray.appendVariantForm(newVariantForm)
    variantsFieldArray.setSelectedVariantFormIndex(countBeforeAdd + 1)

    saveLastChange()
  }

  return {
    onAppend,
  }
}

export default useAppendVariantForm
