import { DietForm } from 'diets'
import { Food } from 'foods'

function hasMissingFoods(dietForm: DietForm, foodsById: Record<number, Food>) {
  const { variantsForms } = dietForm

  for (const variantForm of variantsForms) {
    const { mealsForms } = variantForm

    for (const mealForm of mealsForms) {
      const { ingredientsForms } = mealForm

      for (const ingredientForm of ingredientsForms) {
        const food = foodsById[ingredientForm.foodId]

        if (!food) {
          return true
        }
      }
    }
  }

  return false
}

export default hasMissingFoods
