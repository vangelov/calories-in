import { getIngredientsFormsPath, IngredientField } from './ingredientForm'
import { useFieldArray } from 'react-hook-form'

type Params = {
  variantIndex: number
  mealIndex: number
}

function useIngredientsFieldArray({ variantIndex, mealIndex }: Params) {
  const {
    fields: ingredientsFields,
    insert: insertIngredientForm,
    append: appendIngredientForms,
    remove: removeIngredientForm,
    move: moveIngredientForm,
  } = useFieldArray({
    name: getIngredientsFormsPath(variantIndex, mealIndex),
  })

  return {
    ingredientsFields: ingredientsFields as IngredientField[],

    insertIngredientForm,
    appendIngredientForms,
    removeIngredientForm,
    moveIngredientForm,
  }
}

type IngredientsFieldArray = ReturnType<typeof useIngredientsFieldArray>

export type { IngredientsFieldArray }

export default useIngredientsFieldArray
