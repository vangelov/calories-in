import { MealField } from 'core/diets'
import {
  useIngredientsFormsStoreMethods,
  useIngredientsFormsStoreState,
} from 'core/diets/ingredients/IngredientsFormsStoreProvider'
import IngredientsList from './IngredientsList'

type Props = {
  mealIndex: number
  variantIndex: number
  mealField: MealField
  onAddIngredients: () => void
}

function IngredientsListController({
  mealIndex,
  variantIndex,
  mealField,
  onAddIngredients,
}: Props) {
  const ingredientsFormsStoreMethods = useIngredientsFormsStoreMethods()
  const ingredinetsFormsStoreState = useIngredientsFormsStoreState()

  function onIngredientRemove(index: number, mealIndex: number) {
    ingredientsFormsStoreMethods.removeIngredientFrom(index)
  }

  return (
    <IngredientsList
      ingredientsFields={ingredinetsFormsStoreState}
      mealIndex={mealIndex}
      variantIndex={variantIndex}
      mealField={mealField}
      onAddIngredients={onAddIngredients}
      onIngredientRemove={onIngredientRemove}
    />
  )
}

export default IngredientsListController
