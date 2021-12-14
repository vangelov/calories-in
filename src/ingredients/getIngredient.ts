import { DEFAULT_SERVING_SIZE_IN_GRAMS, Food } from 'foods'
import { Ingredient } from './types'

function getIngredient(food: Food): Ingredient {
  const { volume } = food

  if (
    volume &&
    ['tablespoons', 'teaspoons', 'cups'].includes(volume.portionId)
  ) {
    const { portionId } = volume

    return {
      foodId: food.id,
      amount: 1,
      portionId,
    }
  }

  return {
    foodId: food.id,
    amount: food.servingSizeInGrams || DEFAULT_SERVING_SIZE_IN_GRAMS,
    portionId: 'grams',
  }
}

export default getIngredient
