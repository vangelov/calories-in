import { useUndoRedoMethods } from 'core/undoRedo'
import { useFormContext } from 'react-hook-form'
import { VariantsFieldArray } from './useVariantsFieldArray'
import { getVariantForm, getVariantsFormsPath } from './variantForm'

type Props = {
  variantsFieldArray: VariantsFieldArray
}

function useAddOrEditVariantForm({ variantsFieldArray }: Props) {
  const { saveLastChange } = useUndoRedoMethods()
  const { setValue } = useFormContext()

  function onAdd(name: string) {
    const newVariantForm = getVariantForm(name)
    variantsFieldArray.appendVariantForm(newVariantForm)
    variantsFieldArray.setSelectedVariantFieldId(newVariantForm.fieldId)
    saveLastChange()
  }

  function onEdit(name: string, index: number) {
    setValue(getVariantsFormsPath(index, 'name'), name)
  }

  return {
    onEdit,
    onAdd,
  }
}

export default useAddOrEditVariantForm
