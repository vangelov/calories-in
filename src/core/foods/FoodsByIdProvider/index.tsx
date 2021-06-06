import { Food, FoodsByIdMap } from 'core/types'
import { ReactNode, useReducer } from 'react'
import { State, Action, StateContext, DispatchContext } from './context'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addFood':
      return {
        ...state,
        [action.food.id]: action.food,
      }
    case 'removeFood':
      const newState = { ...state }
      delete newState[action.foodId]
      return newState

    case 'replaceFood':
      return {
        ...state,
        [action.foodId]: action.food,
      }
  }
}

type Props = {
  initialFoods: Food[]
  children: ReactNode
}

const getInitialFoodsMap = (initialFoods: Food[]) => {
  const initialMap: FoodsByIdMap = {}

  for (const food of initialFoods) {
    initialMap[food.id] = food
  }

  return initialMap
}

function FoodsByIdProvider({ children, initialFoods }: Props) {
  const [state, dispatch] = useReducer(
    reducer,
    initialFoods,
    getInitialFoodsMap
  )

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export * from './context'

export default FoodsByIdProvider
