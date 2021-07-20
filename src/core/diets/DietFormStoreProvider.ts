import { useCallback } from 'react'
import { DietForm } from './dietForm'
import { makeStoreProvider } from 'general/stores'
import { getInsertVariantFormAnimationKey, VariantForm } from './variants'
import { useOneTimeCheckStoreMethods } from 'general/oneTimeCheck'
import useDietFormStore from './useDietFormStore'
import { getInsertMealFormAnimationKey, MealForm } from './meals'
import { useDndResponder } from 'general/dndResponders'
import { DropResult } from 'react-beautiful-dnd'

const [
  DietFormStoreProvider,
  useDietForm,
  useDietFormActions,
] = makeStoreProvider(({ initialDietForm }: { initialDietForm: DietForm }) => {
  const oneTimeCheckStoreMethods = useOneTimeCheckStoreMethods()

  const onBeforeAppendVariantForm = useCallback(
    (variantForm: VariantForm) => {
      oneTimeCheckStoreMethods.set(
        getInsertVariantFormAnimationKey(variantForm.fieldId)
      )
    },
    [oneTimeCheckStoreMethods]
  )

  const onBeforeAppendMealForm = useCallback(
    (mealForm: MealForm) => {
      oneTimeCheckStoreMethods.set(
        getInsertMealFormAnimationKey(mealForm.fieldId)
      )
    },
    [oneTimeCheckStoreMethods]
  )

  const store = useDietFormStore({
    initialDietForm,
    onBeforeAppendVariantForm,
    onBeforeAppendMealForm,
  })
  const [dietForm, actions] = store

  useDndResponder('onDragEnd', (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination || type !== 'mealsList') {
      return
    }

    actions.moveMealForm(
      dietForm.selectedVariantFormIndex,
      source.index,
      destination.index
    )
  })

  return store
})

export { useDietForm, useDietFormActions }

export default DietFormStoreProvider
