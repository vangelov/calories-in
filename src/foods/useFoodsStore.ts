import { Food, FoodId } from 'foods'
import { useState, useCallback, useMemo } from 'react'
import produce from 'immer'
import { makeStoreProvider, useCallbacksMemo } from 'general'
import { useSaveValue } from 'persistence'

type Params = {
  initialFoods: Food[]
}

function sortedFoods(foods: Food[]) {
  return [...foods].sort((food1, food2) => {
    if (food1.categoryId === food2.categoryId) {
      return food1.name.localeCompare(food2.name)
    }

    return food1.categoryId - food2.categoryId
  })
}

function useFoodsStore({ initialFoods }: Params) {
  const [foodsById, setFoodsById] = useState<Record<FoodId, Food>>(() => {
    const initialMap: Record<FoodId, Food> = {}

    for (const food of initialFoods) {
      initialMap[food.id] = food
    }

    return initialMap
  })

  const setFoods = useCallback(
    (foods: Food[]) =>
      setFoodsById(
        produce(draftFoodsById => {
          for (const food of foods) {
            draftFoodsById[food.id] = food
          }
        })
      ),
    []
  )

  const removeFood = useCallback(
    (foodId: FoodId) =>
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

  useSaveValue({ value: userFoods, key: 'userFoods' })

  const actions = useCallbacksMemo({ setFoods, removeFood })

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
