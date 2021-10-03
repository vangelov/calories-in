import { useCallback, SetStateAction } from 'react'
import { DietForm } from 'diets'
import produce from 'immer'
import {
  getInsertVariantFormAnimationKey,
  getVariantForm,
  VariantForm,
} from './variantForm'
import { OneTimeCheckActions } from 'general/oneTimeCheck'
import { duplicate, getDuplicatedName, getEnumeratedName } from 'form'

type Params = {
  setDietForm: (action: SetStateAction<DietForm>) => void
  oneTimeCheckActions: OneTimeCheckActions
}

function getIndexAfterRemove(selectedIndex: number, indexToRemove: number) {
  if (indexToRemove < selectedIndex) {
    return selectedIndex - 1
  }

  if (indexToRemove === selectedIndex && indexToRemove > 0) {
    return indexToRemove - 1
  }

  return selectedIndex
}

function getAppendedVariantFormName(variantForms: VariantForm[]) {
  return getEnumeratedName(`Day ${variantForms.length + 1}`, variantForms)
}

function useVariantsFormsActions({ setDietForm, oneTimeCheckActions }: Params) {
  const appendVariantForm = useCallback(
    () =>
      setDietForm(
        produce(draftDietForm => {
          const variantForm = getVariantForm(
            getAppendedVariantFormName(draftDietForm.variantsForms)
          )

          oneTimeCheckActions.set(
            getInsertVariantFormAnimationKey(variantForm.fieldId)
          )

          draftDietForm.variantsForms.push(variantForm)

          draftDietForm.selectedVariantFormIndex =
            draftDietForm.variantsForms.length - 1
        })
      ),
    [setDietForm, oneTimeCheckActions]
  )

  const removeVariantForm = useCallback(
    (indexToRemove: number) =>
      setDietForm(dietForm =>
        produce(dietForm, draftDietForm => {
          const { selectedVariantFormIndex } = draftDietForm

          draftDietForm.selectedVariantFormIndex = getIndexAfterRemove(
            selectedVariantFormIndex,
            indexToRemove
          )
          draftDietForm.variantsForms.splice(indexToRemove, 1)
        })
      ),
    [setDietForm]
  )

  const duplicateVariantForm = useCallback(
    (variantFormIndex: number) =>
      setDietForm(
        produce(draftDietForm => {
          const { variantsForms } = draftDietForm
          const variantForm = variantsForms[variantFormIndex]

          const copiedVariantForm = duplicate(variantForm)
          oneTimeCheckActions.set(
            getInsertVariantFormAnimationKey(copiedVariantForm.fieldId)
          )
          const newVariantForm = {
            ...copiedVariantForm,
            name: getDuplicatedName(variantFormIndex, variantsForms),
          }

          variantsForms.splice(variantFormIndex + 1, 0, newVariantForm)
          draftDietForm.selectedVariantFormIndex = variantFormIndex + 1
        })
      ),
    [setDietForm, oneTimeCheckActions]
  )

  const moveVariantForm = useCallback(
    (fromIndex: number, toIndex: number) =>
      setDietForm(
        produce(draftDietForm => {
          const { variantsForms } = draftDietForm

          const variantForm = variantsForms[fromIndex]
          variantsForms.splice(fromIndex, 1)
          variantsForms.splice(toIndex, 0, variantForm)

          draftDietForm.selectedVariantFormIndex = toIndex
        })
      ),
    [setDietForm]
  )

  const updateVariantForm = useCallback(
    (variantFormIndex: number, partialVariantForm: Partial<VariantForm>) =>
      setDietForm(
        produce(draftDietForm => {
          const variantForm = draftDietForm.variantsForms[variantFormIndex]
          draftDietForm.variantsForms[variantFormIndex] = {
            ...variantForm,
            ...partialVariantForm,
          }
        })
      ),
    [setDietForm]
  )

  const setSelectedVariantFormIndex = useCallback(
    (index: number) =>
      setDietForm(
        produce(draftDietForm => {
          draftDietForm.selectedVariantFormIndex = index
        })
      ),
    [setDietForm]
  )

  return {
    appendVariantForm,
    removeVariantForm,
    duplicateVariantForm,
    updateVariantForm,
    moveVariantForm,
    setSelectedVariantFormIndex,
  }
}

type VariantsFormsActions = ReturnType<typeof useVariantsFormsActions>

export type { VariantsFormsActions }

export default useVariantsFormsActions
