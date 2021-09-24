import { Food } from 'foods'
import { useState, useCallback, useMemo } from 'react'
import produce from 'immer'
import { makeStoreProvider, useCallbacksMemo } from 'general/stores'
import { objectFromNutritionDataKeys } from 'stats'

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
        ...objectFromNutritionDataKeys(key => 0),
        ...food,
      }
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

  const importFoods = useCallback(
    (foodsToImport: Food[]) =>
      setFoodsById(
        produce(draftFoodsById => {
          const foods = Object.values(draftFoodsById)
          const finalFoodsToImport = foodsToImport.map((food, index) => ({
            ...food,
            id: 1 + foods.length + index,
          }))

          for (const foodToImport of finalFoodsToImport) {
            draftFoodsById[foodToImport.id] = foodToImport
          }
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

  const actions = useCallbacksMemo({ setFoods, removeFood, importFoods })

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
