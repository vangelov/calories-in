import { useFoodsListState } from './FoodsListProvider'
import Fuse from 'fuse.js'
import { useMemo } from 'react'
import { Food } from 'core/types'

const OPTIONS = { keys: ['name'] }

type FoodsFilter = {
  categoryId?: number
  query: string
}

type FoodsByCategoryIdMap = { [categoryId: number]: Food[] }

function groupFoodsByCategoryId(foods: Food[]) {
  const foodsByCategoryIdMap: FoodsByCategoryIdMap = {}

  for (const food of foods) {
    const { categoryId } = food

    if (!foodsByCategoryIdMap[categoryId]) {
      foodsByCategoryIdMap[categoryId] = []
    }

    foodsByCategoryIdMap[categoryId].push(food)
  }

  return foodsByCategoryIdMap
}

function useFilterFoods() {
  const foods = useFoodsListState()
  const fuse = useMemo(() => new Fuse(foods, OPTIONS), [foods])
  const foodsByCategoryId = useMemo(() => groupFoodsByCategoryId(foods), [
    foods,
  ])

  function filterFoods(foodsFilter: FoodsFilter): Food[] {
    const { query, categoryId } = foodsFilter

    if (!query) {
      if (categoryId) {
        return foodsByCategoryId[categoryId]
      }
      return foods
    }
    const results = fuse.search(query, { limit: 5 })
    const foodsForQuery = results.map(({ item }) => item)

    if (!categoryId) {
      return foodsForQuery
    }

    return foodsForQuery.filter(food => food.categoryId === categoryId)
  }

  return filterFoods
}

export type { FoodsFilter }

export default useFilterFoods
