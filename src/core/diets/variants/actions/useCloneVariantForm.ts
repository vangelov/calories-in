import { useOneTimeCheckStoreMethods } from 'general/oneTimeCheck'
import { useFormChangesStoreMethods } from 'general/undoRedo'
import { VariantsFieldArray } from '../useVariantsFieldArray'
import { getInsertVariantFormAnimationKey } from '../variantForm'

type Props = {
  variantsFieldArray: VariantsFieldArray
}

function useCloneVariantForm({ variantsFieldArray }: Props) {
  const { saveLastChange } = useFormChangesStoreMethods()
  const oneTimeCheck = useOneTimeCheckStoreMethods()

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
