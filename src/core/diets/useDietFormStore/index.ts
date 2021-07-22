import { useCallback, useState } from 'react'
import { DietForm } from '../dietForm'
import useVariantsFormsActions, {
  VariantsFormsActions,
} from './useVariantsFormsActions'
import useMealsFormsActions, { MealsFormsActions } from './useMealsFormsActions'
import { useCallbacksMemo } from 'general/stores'
import useIngredientsFormsActions, {
  IngredientsFormsActions,
} from './useIngredientsFormsActions'
import { DndRespondersActions } from 'general/dndResponders/useDndRespondersStore'
import { AnimationsStoreActions } from 'general/oneTimeCheck/useOneTimeCheckStore'
import { makeStoreProvider } from 'general/stores'

export type Params = {
  initialDietForm: DietForm
  dndRespondersActions: DndRespondersActions
  animationsStoreActions: AnimationsStoreActions
}

type Actions = VariantsFormsActions &
  MealsFormsActions &
  IngredientsFormsActions

function useDietFormStore({
  initialDietForm,
  dndRespondersActions,
  animationsStoreActions,
}: Params) {
  const [dietForm, setDietForm] = useState(initialDietForm)

  const variantsFormsActions = useVariantsFormsActions({
    setDietForm,
    animationsStoreActions,
  })

  const mealsFormsActions = useMealsFormsActions({
    setDietForm,
    animationsStoreActions,
    dndRespondersActions,
  })

  const ingredientsFormsActions = useIngredientsFormsActions({
    setDietForm,
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
