import { useUndoRedoMethods } from 'core/undoRedo'
import { useFieldArray, UseFormReturn, useWatch } from 'react-hook-form'
import { DietForm } from 'core/dietForm'
import { getVariantsFormsPath, VariantField } from './variantForm'

type Params = {
  formMethods: UseFormReturn<DietForm>
}

function useVariantsFieldArray({ formMethods }: Params) {
  const { setValue, control } = formMethods
  const { saveLastChange } = useUndoRedoMethods()
  const selectedVariantFormIndex =
    useWatch({
      name: 'selectedVariantFormIndex',
      control,
    }) || 0

  const {
    fields,
    append: appendVariantForm,
    remove: removeVariantForm,
    move: moveVariantForm,
  } = useFieldArray({
    name: getVariantsFormsPath() as any,
    control,
  })

  const variantsFields = fields as VariantField[]
  const selectedVariantField = variantsFields[selectedVariantFormIndex]

  function setSelectedVariantFormIndex(index: number) {
    setValue('selectedVariantFormIndex', index)
    saveLastChange()
  }

  return {
    variantsFields,
    setSelectedVariantFormIndex,
    appendVariantForm,
    removeVariantForm,
    moveVariantForm,
    selectedVariantFormIndex,
    selectedVariantField,
  }
}

type VariantsFieldArray = ReturnType<typeof useVariantsFieldArray>

export type { VariantsFieldArray }

export default useVariantsFieldArray
