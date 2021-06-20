import { useOneTimeCheck } from 'core/OneTimeCheckProvider'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useFormContext } from 'react-hook-form'
import { VariantsFieldArray } from './useVariantsFieldArray'
import { getVariantForm, VariantForm } from './variantForm'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  variantsFieldArray: VariantsFieldArray
}

const deepCopy = (value: any, replacer?: (key: string, value: any) => any) =>
  JSON.parse(JSON.stringify(value, replacer))

function useAddOrEditVariantForm({ variantsFieldArray }: Props) {
  const { saveLastChange } = useUndoRedoMethods()
  const { setValue, getValues } = useFormContext()
  const oneTimeCheck = useOneTimeCheck()

  function onAdd(name: string) {
    const newVariantForm = getVariantForm(name)
    const variantsFormsCountBeforeAdd =
      variantsFieldArray.variantsFields.length - 1

    oneTimeCheck.set(`test${newVariantForm.fieldId}`)

    variantsFieldArray.appendVariantForm(newVariantForm)
    variantsFieldArray.setSelectedVariantFormIndex(
      variantsFormsCountBeforeAdd + 1
    )
    saveLastChange()
  }

  function onEdit(name: string, index: number) {
    console.log('set', name, index)
    const values = getValues()
    const b = values.variantsForms.map((v: any, i: any) => {
      if (i === index) {
        return {
          ...v,
          name,
        }
      }

      return v
    })
    setValue('variantsForms', b)
  }

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

    const variantsCountBeforeClone =
      variantsFieldArray.variantsFields.length - 1

    oneTimeCheck.set(`test${copiedVariantForm.fieldId}`)

    variantsFieldArray.onAppendVariantForm(copiedVariantForm)
    variantsFieldArray.setSelectedVariantFormIndex(variantsCountBeforeClone + 1)
  }

  return {
    onEdit,
    onAdd,
    onClone,
  }
}

export default useAddOrEditVariantForm
