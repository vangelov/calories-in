import { Food } from 'foods'
import { useState, useCallback, useMemo } from 'react'
import produce from 'immer'
import { makeStoreProvider, useCallbacksMemo } from 'general/stores'
import { objectFromNutritionStatsKeys } from 'stats'

type Params = {
  initialFoods: any[]
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
      initialMap[food.id] = {
        ...objectFromNutritionStatsKeys(key => 0),
        ...food,
      }
    }

    return initialMap
  })

  const setFood = useCallback(
    (food: Food) =>
      setFoodsById(
        produce(draftFoodsById => {
          draftFoodsById[food.id] = food
        })
      ),
    []
  )

  const removeFood = useCallback(
    (foodId: number) =>
      setFoodsById(
        produce(draftFoodsById => {
          delete draftFoodsById[foodId]
        })
      ),
    []
  )

  const allFoods = useMemo(() => sortedFoods(Object.values(foodsById)), [
    foodsById,
  ])

  const userFoods = useMemo(
    () => sortedFoods(allFoods.filter(food => food.addedByUser)),
    [allFoods]
  )

  const actions = useCallbacksMemo({ setFood, removeFood })

  const state = useCallbacksMemo({
    allFoods,
    userFoods,
    foodsById,
  })

  return [state, actions] as const
}

const [FoodsStoreProvider, useFoods, useFoodsActions] = makeStoreProvider(
  useFoodsStore
)

export { FoodsStoreProvider, useFoods, useFoodsActions }

export default useFoodsStore
