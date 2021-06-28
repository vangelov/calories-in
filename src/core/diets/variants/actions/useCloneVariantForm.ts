import { useOneTimeCheck } from 'general/oneTimeCheck'
import { useUndoRedoMethods } from 'general/undoRedo'
import { VariantsFieldArray } from '../useVariantsFieldArray'
import { getInsertVariantFormAnimationKey } from '../variantForm'

type Props = {
  variantsFieldArray: VariantsFieldArray
}

function useCloneVariantForm({ variantsFieldArray }: Props) {
  const { saveLastChange } = useUndoRedoMethods()
  const oneTimeCheck = useOneTimeCheck()

  function onClone(name: string, index: number) {
    const copiedVariantForm = variantsFieldArray.getVariantFormCopy(index, name)

    oneTimeCheck.set(
      getInsertVariantFormAnimationKey(copiedVariantForm.fieldId)
    )

    variantsFieldArray.insertVariantForm(index + 1, copiedVariantForm)
    variantsFieldArray.setSelectedVariantFormIndex(index + 1)

    saveLastChange()
  }

  return {
    onClone,
  }
}

export default useCloneVariantForm
