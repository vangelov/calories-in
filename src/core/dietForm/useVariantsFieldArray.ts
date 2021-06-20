import { useUndoRedoMethods } from 'core/undoRedo'
import { useFieldArray, UseFormReturn, useWatch } from 'react-hook-form'
import { DietForm } from './dietForm'
import { getVariantsFormsPath, VariantField, VariantForm } from './variantForm'

type Params = {
  formMethods: UseFormReturn<DietForm>
}

function useVariantsFieldArray({ formMethods }: Params) {
  const { setValue, control } = formMethods
  const { saveLastChange } = useUndoRedoMethods()
  const selectedVariantFieldId = useWatch({
    name: 'selectedVariantFieldId',
    control,
  })

  const {
    fields,
    append: appendVariantForm,
    remove: removeVariantForm,
    move: moveVariantForm,
  } = useFieldArray({
    name: getVariantsFormsPath() as any,
    control,
  })

  function onAppendVariantForm(variantForm: VariantForm) {
    appendVariantForm(variantForm)
    saveLastChange()
  }

  function onRemoveVariantForm(index: number) {
    if (variantsFields.length > 1) {
      removeVariantForm(index)
      let nextVariantFieldIndex = 0

      if (index === variantsFields.length - 1) {
        nextVariantFieldIndex = index - 1
      } else {
        nextVariantFieldIndex = index + 1
      }

      const nextVariantField = variantsFields[nextVariantFieldIndex]
      setSelectedVariantFieldId(nextVariantField.fieldId as string)

      saveLastChange()
    }
  }

  const variantsFields = fields as VariantField[]

  const selectedVariantField = variantsFields.find(
    ({ fieldId }) => fieldId === selectedVariantFieldId
  )
  const selectedVariantFieldIndex = variantsFields.findIndex(
    ({ fieldId }) => fieldId === selectedVariantFieldId
  )

  function setSelectedVariantFieldId(fieldId: string) {
    setValue('selectedVariantFieldId', fieldId)
    saveLastChange()
  }

  if (!selectedVariantFieldId || !selectedVariantField) {
    throw new Error()
  }

  return {
    variantsFields,
    selectedVariantFieldId,
    onAppendVariantForm,
    appendVariantForm,
    onRemoveVariantForm,
    moveVariantForm,
    selectedVariantField,
    selectedVariantFieldIndex,
    setSelectedVariantFieldId,
  }
}

type VariantsFieldArray = ReturnType<typeof useVariantsFieldArray>

export type { VariantsFieldArray }

export default useVariantsFieldArray
