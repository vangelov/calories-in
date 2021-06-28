import { useFieldArray, UseFormReturn, useWatch } from 'react-hook-form'
import { DietForm } from '../dietForm'
import { getVariantsFormsPath, VariantField, VariantForm } from './variantForm'
import deepCopy from 'general/deepCopy'
import { v4 as uuidv4 } from 'uuid'

type Params = {
  formMethods: UseFormReturn<DietForm>
}

function useVariantsFieldArray({ formMethods }: Params) {
  const { setValue, control, getValues } = formMethods

  const selectedVariantFormIndex =
    useWatch({
      name: 'selectedVariantFormIndex',
      control,
    }) || 0

  const {
    fields,
    append: appendVariantForm,
    remove: removeVariantForm,
    insert: insertVariantForm,
    move: moveVariantForm,
  } = useFieldArray({
    name: getVariantsFormsPath() as any,
    control,
  })

  const variantsFields = fields as VariantField[]
  const selectedVariantField = variantsFields[selectedVariantFormIndex]

  function setSelectedVariantFormIndex(index: number) {
    setValue('selectedVariantFormIndex', index)
  }

  function getVariantFormCopy(index: number, newName: string) {
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

    copiedVariantForm.name = newName

    return copiedVariantForm
  }

  return {
    variantsFields,
    setSelectedVariantFormIndex,
    appendVariantForm,
    insertVariantForm,
    removeVariantForm,
    moveVariantForm,
    selectedVariantFormIndex,
    selectedVariantField,
    getVariantFormCopy,
  }
}

type VariantsFieldArray = ReturnType<typeof useVariantsFieldArray>

export type { VariantsFieldArray }

export default useVariantsFieldArray
