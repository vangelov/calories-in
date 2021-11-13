import { useCallback, useState } from 'react'
import { DietForm } from './dietForm'
import { useVariantsFormsActions, VariantsFormsActions } from 'variants'
import { useMealsFormsActions, MealsFormsActions } from 'meals'
import { useCallbacksMemo, makeStoreProvider } from 'general'
import {
  useIngredientsFormsActions,
  IngredientsFormsActions,
} from 'ingredients'
import { OneTimeCheckActions } from 'general'
import { useSaveValue } from 'persistence'

export type Params = {
  initialDietForm: DietForm
  oneTimeCheckActions: OneTimeCheckActions
}

type Actions = VariantsFormsActions &
  MealsFormsActions &
  IngredientsFormsActions

function useDietFormStore({
  initialDietForm,

  oneTimeCheckActions,
}: Params) {
  const [dietForm, setDietForm] = useState(initialDietForm)

  useSaveValue({ value: dietForm, key: 'lastDietForm' })

  const variantsFormsActions = useVariantsFormsActions({
    setDietForm,
    oneTimeCheckActions,
  })

  const mealsFormsActions = useMealsFormsActions({
    setDietForm,
    oneTimeCheckActions,
  })

  const ingredientsFormsActions = useIngredientsFormsActions({
    setDietForm,
    oneTimeCheckActions,
  })

  const updateDietForm = useCallback(
    (partialDietForm: Partial<DietForm>) => {
      setDietForm(dietForm => {
        return {
          ...dietForm,
          ...partialDietForm,
        }
      })
    },
    [setDietForm]
  )

  const ownActions = {
    setDietForm,
    updateDietForm,
  }

  const actions: Actions & typeof ownActions = useCallbacksMemo({
    ...ownActions,
    ...mealsFormsActions,
    ...variantsFormsActions,
    ...ingredientsFormsActions,
  })

  return [dietForm, actions] as const
}

const [
  DietFormStoreProvider,
  useDietForm,
  useDietFormActions,
] = makeStoreProvider(useDietFormStore)

export { DietFormStoreProvider, useDietForm, useDietFormActions }

export default useDietFormStore
