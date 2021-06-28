import Fuse from 'fuse.js'
import { useMemo } from 'react'
import { Food } from 'core/types'
import { useFoodsByIdState } from './FoodsByIdProvider'

const OPTIONS = { keys: ['name'] }

type FoodsFilter = {
  categoryId?: number
  query: string
}

function groupFoodsByCategoryId(foods: Food[]) {
  const foodsByCategoryIdMap: Record<number, Food[]> = {}

  for (const food of foods) {
    const { categoryId } = food

    if (!foodsByCategoryIdMap[categoryId]) {
      foodsByCategoryIdMap[categoryId] = []
    }

    foodsByCategoryIdMap[categoryId].push(food)
  }

  return foodsByCategoryIdMap
}

function useFilterFoods(foodsFilter: FoodsFilter) {
  const foodsById = useFoodsByIdState()
  const foods = useMemo(() => Object.values(foodsById), [foodsById])
  const fuse = useMemo(() => new Fuse(foods, OPTIONS), [foods])
  const foodsByCategoryId = useMemo(() => groupFoodsByCategoryId(foods), [
    foods,
  ])

  const { query, categoryId } = foodsFilter

  if (!query) {
    return categoryId ? foodsByCategoryId[categoryId] : foods
  }
  const foodsForQuery = fuse.search(query, { limit: 5 }).map(({ item }) => item)

  if (!categoryId) {
    return foodsForQuery
  }

  return foodsForQuery.filter(food => food.categoryId === categoryId)
}

export type { FoodsFilter }

export default useFilterFoods
