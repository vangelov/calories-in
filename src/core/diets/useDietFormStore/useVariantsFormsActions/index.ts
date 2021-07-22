import { useCallback, SetStateAction } from 'react'
import { DietForm } from '../../dietForm'
import produce from 'immer'
import {
  getInsertVariantFormAnimationKey,
  getVariantForm,
  VariantForm,
} from '../../variants'
import getIndexAfterRemove from './getIndexAfterRemove'
import duplicate from './duplicate'
import { AnimationsStoreActions } from 'general/oneTimeCheck/useOneTimeCheckStore'

type Params = {
  setDietForm: (action: SetStateAction<DietForm>) => void
  animationsStoreActions: AnimationsStoreActions
}

function useVariantsFormsActions({
  setDietForm,
  animationsStoreActions,
}: Params) {
  const appendVariantForm = useCallback(
    (partialVariantForm: Partial<VariantForm>) =>
      setDietForm(
        produce(draftDietForm => {
          const variantForm = {
            ...getVariantForm(''),
            ...partialVariantForm,
          }

          animationsStoreActions.set(
            getInsertVariantFormAnimationKey(variantForm.fieldId)
          )

          draftDietForm.variantsForms.push(variantForm)

          draftDietForm.selectedVariantFormIndex =
            draftDietForm.variantsForms.length - 1
        })
      ),
    [setDietForm, animationsStoreActions]
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
    (variantFormIndex: number, partialVariantForm: Partial<VariantForm>) =>
      setDietForm(
        produce(draftDietForm => {
          const { variantsForms } = draftDietForm
          const variantForm = variantsForms[variantFormIndex]

          const copiedVariantForm = duplicate(variantForm)
          animationsStoreActions.set(
            getInsertVariantFormAnimationKey(copiedVariantForm.fieldId)
          )
          variantsForms.push({
            ...copiedVariantForm,
            ...partialVariantForm,
          })

          draftDietForm.selectedVariantFormIndex = variantsForms.length - 1
        })
      ),
    [setDietForm, animationsStoreActions]
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
