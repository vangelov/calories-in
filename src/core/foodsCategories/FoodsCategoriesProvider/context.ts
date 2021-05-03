import { createContext, useContext } from 'react'
import { FoodCategory } from 'core/types'

type FoodCategoryByIdMap = { [foodCategoryId: number]: FoodCategory }
type State = FoodCategory[]

const StateContext = createContext<State | undefined>(undefined)
const FoodCategoryByIdMapContext = createContext<
  FoodCategoryByIdMap | undefined
>(undefined)

function useFoodsCategoriesState() {
  const state = useContext(StateContext)

  if (!state) {
    throw new Error('Missing state context provider')
  }

  return state
}

function useFoodCategoryByIdMap() {
  const foodCategoryByIdMap = useContext(FoodCategoryByIdMapContext)

  if (!foodCategoryByIdMap) {
    throw new Error('Missing state context provider')
  }

  return foodCategoryByIdMap
}

export type { State, FoodCategoryByIdMap }

export {
  StateContext,
  FoodCategoryByIdMapContext,
  useFoodsCategoriesState,
  useFoodCategoryByIdMap,
}
