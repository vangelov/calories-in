import { Food, FoodCategory } from 'core/types'
import { useFoodsListState } from 'core/foods'
import { useMemo } from 'react'
import { useFoodsCategoriesState } from './FoodsCategoriesProvider'
import { useSameOrPreviousValue } from 'core/utils'

type FoodsPerCategory = {
  foodCategory: FoodCategory
  foods: Food[]
}

type FoodsByCategoryId = { [categoryId: number]: Food[] }

function groupFoodsByCategoryId(foods: Food[]): FoodsByCategoryId {
  const foodsByCategoryId: Record<number, Food[]> = {}

  for (const food of foods) {
    if (!foodsByCategoryId[food.categoryId]) {
      foodsByCategoryId[food.categoryId] = []
    }

    foodsByCategoryId[food.categoryId].push(food)
  }

  return foodsByCategoryId
}

function getFoodsPerCategories(
  foodsCategories: FoodCategory[],
  foodsByCategoryId: FoodsByCategoryId
) {
  const foodsPerCategories: FoodsPerCategory[] = []

  for (const foodCategory of foodsCategories) {
    foodsPerCategories.push({
      foodCategory,
      foods: foodsByCategoryId[foodCategory.id],
    })
  }

  return foodsPerCategories
}

function useFoodsPerCategories() {
  const foods = useFoodsListState()
  const foodsCategories = useFoodsCategoriesState()
  const previousFoods = useSameOrPreviousValue(foods)

  const foodsPerCategories = useMemo(() => {
    const foodsByCategoryId = groupFoodsByCategoryId(foods)
    return getFoodsPerCategories(foodsCategories, foodsByCategoryId)
  }, [foods, foodsCategories])

  const foodsCountDiff = foods.length - previousFoods.length

  return { foodsPerCategories, foodsCountDiff }
}

export default useFoodsPerCategories
