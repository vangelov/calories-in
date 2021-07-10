import { Food } from 'core/types'
import tuple from 'general/tuple'
import { useState, useCallback, useMemo } from 'react'

type Params = {
  initialFoods: Food[]
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

  const foods = useMemo(() => Object.values(foodsById), [foodsById])

  const methods = useMemo(() => ({ addFood, removeFood, replaceFood }), [
    addFood,
    removeFood,
    replaceFood,
  ])

  const state = useMemo(
    () => ({
      foods,
      getFoodById,

      foodsById,
    }),
    [getFoodById, foodsById, foods]
  )

  return tuple(state, methods)
}

type FoodsStore = ReturnType<typeof useFoodsStore>

export type { FoodsStore }

export default useFoodsStore
