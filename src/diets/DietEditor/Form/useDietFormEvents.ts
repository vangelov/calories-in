import { UseDisclosureReturn } from '@chakra-ui/hooks'
import { DietForm, useDietFormActions, ScrollManager } from 'diets'
import { Food } from 'foods'
import { getIngredient } from 'ingredients'
import { getMealForm } from 'meals'
import { AppLocation } from 'undoRedo'

type Params = {
  scrollManager: ScrollManager
  foodsDrawerDisclosure: UseDisclosureReturn
}

function useDietFormEvents({ scrollManager, foodsDrawerDisclosure }: Params) {
  const dietFormActions = useDietFormActions()
  const { setScrollState } = scrollManager

  function onMealAdded(foods: Food[], mealName?: string) {
    foodsDrawerDisclosure.onClose()
    const ingredients = foods.map(getIngredient)
    const mealForm = getMealForm({ name: mealName as string, ingredients })
    dietFormActions.appendMealForm(mealForm)
  }

  function onUndoOrRedo(
    form: DietForm,
    { scrollTop, scrollLeft, variantIndex }: AppLocation
  ) {
    const finalVariantIndex = form.variantsForms[variantIndex]
      ? variantIndex
      : form.selectedVariantFormIndex

    dietFormActions.updateDietForm({
      ...form,
      selectedVariantFormIndex: finalVariantIndex,
    })

    setScrollState({ top: scrollTop, left: scrollLeft })
  }

  return {
    onUndoOrRedo,
    onMealAdded,
  }
}

export default useDietFormEvents
