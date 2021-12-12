import { UseDisclosureReturn } from '@chakra-ui/hooks'
import { DietForm, useDietFormActions, ScrollManager } from 'diets'
import { Food } from 'foods'
import { getMealForm, getMealFromFoods, getMealFromRecipe } from 'meals'
import { normalizedRecipe, Recipe } from 'recipes'
import { AppLocation } from 'undoRedo'

type Params = {
  scrollManager: ScrollManager
  foodsDrawerDisclosure: UseDisclosureReturn
  recipesDrawerDisclosure: UseDisclosureReturn
}

function useDietFormEvents({
  scrollManager,
  foodsDrawerDisclosure,
  recipesDrawerDisclosure,
}: Params) {
  const dietFormActions = useDietFormActions()
  const { setScrollState } = scrollManager

  function onMealAdded(foods: Food[], mealName?: string) {
    foodsDrawerDisclosure.onClose()
    const meal = getMealFromFoods(mealName as string, foods)
    const mealForm = getMealForm(meal)
    dietFormActions.appendMealForm(mealForm)
  }

  function onRecipeSelect(recipe: Recipe) {
    recipesDrawerDisclosure.onClose()
    const meal = getMealFromRecipe(normalizedRecipe(recipe))
    const mealForm = getMealForm(meal)
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
    onRecipeSelect,
  }
}

export default useDietFormEvents
