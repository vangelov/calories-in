import { MealField } from 'core/diets'
import makeUseContext from 'general/makeUseContext'
import { createContext, ReactNode, useEffect } from 'react'
import { useIngredientsStatsStore } from '.'
import { useMealsStatsStoreMethods } from './MealsStatsStoreProvider'
import { IngredientsStatsStore } from './useIngredientsStatsStore'

const StateContext = createContext<IngredientsStatsStore | undefined>(undefined)
const useIngredientsStatsStoreState = makeUseContext(StateContext)

type Props = {
  children: ReactNode
  variantIndex: number
  mealIndex: number
  mealField: MealField
}

function IngredientsStatsStoreProvider({
  children,
  variantIndex,
  mealIndex,
  mealField,
}: Props) {
  const mealsStatsStoreMethods = useMealsStatsStoreMethods()
  const state = useIngredientsStatsStore({ variantIndex, mealIndex, mealField })

  useEffect(() => {
    const { ingredientsStatsSum } = state
    mealsStatsStoreMethods.addMealStats(mealIndex, ingredientsStatsSum)

    return () => {
      mealsStatsStoreMethods.deleteMealStats(mealIndex)
    }
  })

  return <StateContext.Provider value={state}>{children}</StateContext.Provider>
}

export { useIngredientsStatsStoreState }

export default IngredientsStatsStoreProvider
