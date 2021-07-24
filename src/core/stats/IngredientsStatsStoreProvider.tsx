import { MealForm } from 'core/diets'
import makeUseContext from 'general/makeUseContext'
import { createContext, ReactNode, useEffect } from 'react'
import { useIngredientsStatsStore } from '.'
import { useMealsStatsStoreMethods } from './MealsStatsStoreProvider'
import { IngredientsStatsStore } from './useIngredientsStatsStore'

const StateContext = createContext<IngredientsStatsStore[0] | undefined>(
  undefined
)
const useIngredientsStatsStoreState = makeUseContext(StateContext)

type Props = {
  children: ReactNode
  variantIndex: number
  mealIndex: number
  mealForm: MealForm
}

function IngredientsStatsStoreProvider({
  children,
  variantIndex,
  mealIndex,
  mealForm,
}: Props) {
  const mealsStatsStoreMethods = useMealsStatsStoreMethods()
  const [state] = useIngredientsStatsStore({
    variantIndex,
    mealIndex,
    mealForm,
  })

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
