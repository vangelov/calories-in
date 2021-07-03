import { useFormChangesStoreMethods } from 'general/undoRedo'
import { VariantsFieldArray } from '../useVariantsFieldArray'

type Params = {
  variantsFieldArray: VariantsFieldArray
}

function useRemoveVariantForm({ variantsFieldArray }: Params) {
  const { saveLastChange } = useFormChangesStoreMethods()

  function onRemove(index: number) {
    const {
      selectedVariantFormIndex,
      removeVariantForm,
      setSelectedVariantFormIndex,
    } = variantsFieldArray
    let nextVariantFieldIndex = 0

    if (index <= selectedVariantFormIndex) {
      nextVariantFieldIndex = Math.max(selectedVariantFormIndex - 1, 0)
    }
    setSelectedVariantFormIndex(nextVariantFieldIndex)
    removeVariantForm(index)

    saveLastChange()
  }

  return {
    onRemove,
  }
}

export default useRemoveVariantForm
