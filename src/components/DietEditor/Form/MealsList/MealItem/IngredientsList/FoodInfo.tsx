import { Text, Box } from '@chakra-ui/react'
import { useFoodCategoryByIdMap } from 'core/foodsCategories/FoodsCategoriesProvider'
import { useFoodsByIdState } from 'core/foods/FoodsByIdProvider'
import { IngredientField } from 'core/dietForm'

type Props = {
  ingredientField: IngredientField
}

function FoodInfo({ ingredientField }: Props) {
  if (!ingredientField.foodId) {
    throw new Error('Food id is missing')
  }

  const foodsByIdState = useFoodsByIdState()
  const foodCategoryByIdMap = useFoodCategoryByIdMap()
  const food = foodsByIdState[ingredientField.foodId]
  const foodCategory = foodCategoryByIdMap[food.categoryId]

  return (
    <>
      <Box
        height="100%"
        position="absolute"
        top="0"
        left="0"
        width="6px"
        backgroundColor={foodCategory.color}
      />

      <Text fontSize="lg" color="gray.600">
        {food.name}
      </Text>
    </>
  )
}

export default FoodInfo
