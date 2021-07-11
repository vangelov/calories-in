import { Food } from 'core/types'
import tuple from 'general/tuple'
import { useState, useCallback, useMemo } from 'react'

type Params = {
  initialFoods: Food[]
}

function sortedFoods(foods: Food[]) {
  return [...foods].sort((food1, food2) => {
    if (food1.categoryId === food2.categoryId) {
      return food2.id - food1.id
    }

    return food1.categoryId - food2.categoryId
  })
}

function useFoodsStore({ initialFoods }: Params) {
  const [foodsById, setFoodsById] = useState<Record<number, Food>>(() => {
    const initialMap: Record<number, Food> = {}

    for (const food of initialFoods) {
      initialMap[food.id] = food
    }

    return initialMap
  })

  const addFood = useCallback(
    (food: Food) =>
      setFoodsById(foodsById => ({
        ...foodsById,
        [food.id]: food,
      })),
    []
  )

  const removeFood = useCallback((foodId: number) => {
    setFoodsById(foodsById => {
      const newState = { ...foodsById }
      delete newState[foodId]
      return newState
    })
  }, [])

  const replaceFood = useCallback((foodId: number, food: Food) => {
    setFoodsById(foodsById => {
      return {
        ...foodsById,
        [foodId]: food,
      }
    })
  }, [])

  const getFoodById = useCallback((id: number) => foodsById[id], [foodsById])

  const allFoods = useMemo(() => sortedFoods(Object.values(foodsById)), [
    foodsById,
  ])

  const userFoods = useMemo(
    () => sortedFoods(allFoods.filter(food => food.addedByUser)),
    [allFoods]
  )

  const indexOfFood = useCallback((food: Food, foods: Food[]) => {
    return foods.map(({ id }) => id).indexOf(food.id)
  }, [])

  const methods = useMemo(() => ({ addFood, removeFood, replaceFood }), [
    addFood,
    removeFood,
    replaceFood,
  ])

  const state = useMemo(
    () => ({
      allFoods,
      userFoods,
      getFoodById,
      indexOfFood,
      foodsById,
    }),
    [getFoodById, foodsById, allFoods, indexOfFood, userFoods]
  )

  return tuple(state, methods)
}

type FoodsStore = ReturnType<typeof useFoodsStore>

export type { FoodsStore }

export default useFoodsStore
