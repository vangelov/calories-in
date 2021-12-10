import { useState, useMemo } from 'react'
import { makeStoreProvider, useCallbacksMemo } from 'general'
import { Meal } from 'meals'

type Params = {
  initialMeals: Meal[]
}

function sortedMeals(meals: Meal[]) {
  return [...meals].sort((meal1, meal2) => {
    if (meal1.categoryId === meal2.categoryId) {
      return meal1.name.localeCompare(meal2.name)
    }

    const categoryId1 = meal1.categoryId || 0
    const categoryId2 = meal2.categoryId || 0

    return categoryId1 - categoryId2
  })
}

function useMealsStore({ initialMeals }: Params) {
  const [mealsById] = useState<Record<number, Meal>>(() => {
    const initialMap: Record<number, Meal> = {}

    for (const meal of initialMeals) {
      if (meal.id) {
        initialMap[meal.id] = meal
      }
    }

    return initialMap
  })

  const meals = useMemo(() => sortedMeals(Object.values(mealsById)), [
    mealsById,
  ])

  const actions = useCallbacksMemo({})

  const state = useCallbacksMemo({
    meals,
    mealsById,
  })

  return [state, actions] as const
}

const [MealsStoreProvider, useMeals] = makeStoreProvider(useMealsStore)

export { MealsStoreProvider, useMeals }

export default useMealsStore
