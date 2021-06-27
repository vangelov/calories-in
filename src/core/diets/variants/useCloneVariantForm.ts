import { useOneTimeCheck } from 'general/oneTimeCheck'
import { useUndoRedoMethods } from 'general/undoRedo'
import { useFormContext } from 'react-hook-form'
import { VariantsFieldArray } from './useVariantsFieldArray'
import { getInsertVariantFormAnimationKey, VariantForm } from './variantForm'
import { v4 as uuidv4 } from 'uuid'
import deepCopy from 'general/deepCopy'

type Props = {
  variantsFieldArray: VariantsFieldArray
}

function useCloneVariantForm({ variantsFieldArray }: Props) {
  const { saveLastChange } = useUndoRedoMethods()
  const { getValues } = useFormContext()
  const oneTimeCheck = useOneTimeCheck()

  function onClone(name: string, index: number) {
    const values = getValues()
    const originalVariantForm = values.variantsForms[index]
    const copiedVariantForm = deepCopy(
      originalVariantForm,
      (key: string, value: any) => {
        if (key === 'fieldId') {
          return uuidv4()
        }

        return value
      }
    ) as VariantForm

    copiedVariantForm.name = name

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
