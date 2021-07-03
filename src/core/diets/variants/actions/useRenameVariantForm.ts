import { useFormChangesStoreMethods } from 'general/undoRedo'
import { useFormContext } from 'react-hook-form'
import { VariantForm, getVariantsFormsPath } from '../variantForm'

function useRenameVariantForm() {
  const { saveLastChange } = useFormChangesStoreMethods()
  const { setValue, getValues } = useFormContext()

  function onRename(name: string, indexToRename: number) {
    const values = getValues()

    const updatedVariantsForms = values.variantsForms.map(
      (variantForm: VariantForm, index: number) => {
        if (index === indexToRename) {
          return {
            ...variantForm,
            name,
          }
        }

        return variantForm
      }
    )

    const path = getVariantsFormsPath()
    setValue(path, updatedVariantsForms)

    saveLastChange()
  }

  return {
    onRename,
  }
}

export default useRenameVariantForm
