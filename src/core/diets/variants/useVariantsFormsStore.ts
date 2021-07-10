import { useFieldArray, UseFormReturn, useWatch } from 'react-hook-form'
import {
  getVariantForm,
  getVariantsFormsPath,
  VariantField,
  VariantForm,
} from './variantForm'
import deepCopy from 'general/deepCopy'
import { v4 as uuidv4 } from 'uuid'
import tuple from 'general/tuple'
import { DietForm } from '../dietForm'

type Params = {
  onBeforeVariantFormAppend: (variantForm: VariantForm) => void
  onBeforeInsertClonedVariantForm: (variantForm: VariantForm) => void
  onAfterChange: () => void
  dietFormMethods: UseFormReturn<DietForm>
}

function useVariantsFormsStore({
  onBeforeVariantFormAppend,
  onBeforeInsertClonedVariantForm,
  onAfterChange,
  dietFormMethods,
}: Params) {
  const { setValue, control, getValues } = dietFormMethods

  const selectedVariantFormIndex =
    useWatch({
      name: 'selectedVariantFormIndex',
      control,
    }) || 0

  const { fields, append, remove, insert, move } = useFieldArray({
    name: getVariantsFormsPath() as any,
    control,
  })

  const variantsFields = fields as VariantField[]

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

  function setSelectedVariantFormIndex(index: number) {
    setValue('selectedVariantFormIndex', index)
    onAfterChange()
  }

  function appendVariantForm(name: string) {
    const newVariantForm = getVariantForm(name)
    const countBeforeAdd = variantsFields.length - 1

    onBeforeVariantFormAppend(newVariantForm)

    append(newVariantForm)
    setSelectedVariantFormIndex(countBeforeAdd + 1)

    onAfterChange()
  }

  function cloneVariantForm(name: string, index: number) {
    const copiedVariantForm = getVariantFormCopy(index, name)

    onBeforeInsertClonedVariantForm(copiedVariantForm)

    insert(variantsFields.length, copiedVariantForm)
    setSelectedVariantFormIndex(variantsFields.length)

    onAfterChange()
  }

  function removeVariantForm(indexToRemove: number) {
    if (indexToRemove < selectedVariantFormIndex) {
      setSelectedVariantFormIndex(selectedVariantFormIndex - 1)
    } else if (
      indexToRemove === selectedVariantFormIndex &&
      indexToRemove > 0
    ) {
      setSelectedVariantFormIndex(indexToRemove - 1)
    }
    remove(indexToRemove)
    onAfterChange()
  }

  function renameVariantForm(name: string, indexToRename: number) {
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
    setValue(path as any, updatedVariantsForms)

    onAfterChange()
  }

  function reorderVariantsForms(sourceIndex: number, destinationIndex: number) {
    move(sourceIndex, destinationIndex)
    setSelectedVariantFormIndex(destinationIndex)
    onAfterChange()
  }

  const methods = {
    setSelectedVariantFormIndex,
    appendVariantForm,
    cloneVariantForm,
    removeVariantForm,
    renameVariantForm,
    reorderVariantsForms,
  }

  const state = {
    selectedVariantFormIndex,
    variantsFields,
    selectedVariantField: variantsFields[selectedVariantFormIndex],
  }

  return tuple(state, methods)
}

type VariantsFormsStore = ReturnType<typeof useVariantsFormsStore>

export type { VariantsFormsStore }

export default useVariantsFormsStore
