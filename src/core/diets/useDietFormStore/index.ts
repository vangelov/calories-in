import { useState } from 'react'
import { DietForm } from '../dietForm'
import useVariantsFormsActions, {
  VariantsFormsActions,
} from './useVariantsFormsActions'
import useMealsFormsActions, { MealsFormsActions } from './useMealsFormsActions'
import { useCallbacksMemo } from 'general/stores'
import useIngredientsFormsActions, {
  IngredientsFormsActions,
} from './useIngredientsFormsActions'
import { VariantForm } from '../variants'
import { MealForm } from '../meals'

export type Params = {
  initialDietForm: DietForm
  onBeforeAppendVariantForm: (variantForm: VariantForm) => void
  onBeforeAppendMealForm: (mealForm: MealForm) => void
}

type Actions = VariantsFormsActions &
  MealsFormsActions &
  IngredientsFormsActions

function useDietFormStore({
  initialDietForm,
  onBeforeAppendVariantForm,
  onBeforeAppendMealForm,
}: Params) {
  const [dietForm, setDietForm] = useState(initialDietForm)

  const variantsFormsActions = useVariantsFormsActions({
    setDietForm,
    onBeforeAppendVariantForm,
  })

  const mealsFormsActions = useMealsFormsActions({
    setDietForm,
    onBeforeAppendMealForm,
  })

  const ingredientsFormsActions = useIngredientsFormsActions({
    setDietForm,
  })

  const ownActions = {
    setDietForm,
  }

  const actions: Actions & typeof ownActions = useCallbacksMemo({
    ...ownActions,
    ...mealsFormsActions,
    ...variantsFormsActions,
    ...ingredientsFormsActions,
  })

  return [dietForm, actions] as const
}

export default useDietFormStore
