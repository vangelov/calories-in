import { Food, FoodCategory } from 'core/types'
import { useFoodsListState } from './FoodsListProvider'
import { useMemo } from 'react'

const CATEGORIES = [
  { name: 'Poultry', id: 1 },
  { name: 'Beef', id: 2 },
  { name: 'Pork', id: 3 },
  { name: 'Fisj', id: 4 },
  { name: 'Grains', id: 5 },
]

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

function useFoodsPerCategories(): FoodsPerCategory[] {
  const foods = useFoodsListState()

  const foodsPerCategories = useMemo(() => {
    const foodsByCategoryId = groupFoodsByCategoryId(foods)
    return getFoodsPerCategories(CATEGORIES, foodsByCategoryId)
  }, [foods])

  return foodsPerCategories
}

export default useFoodsPerCategories
