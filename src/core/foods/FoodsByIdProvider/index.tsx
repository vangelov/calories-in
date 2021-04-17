import { FoodsByIdMap } from 'core/types'
import { ReactNode, useReducer } from 'react'
import { State, Action, StateContext, DispatchContext } from './context'

function reducer(state: State, action: Action): State {
  console.log('action', action.type)
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
  }
}

type Props = {
  initialFoodsByIdMap: FoodsByIdMap
  children: ReactNode
}

function FoodsByIdProvider({ children, initialFoodsByIdMap }: Props) {
  const [state, dispatch] = useReducer(reducer, initialFoodsByIdMap)

  console.log('FoosdById')

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export * from './context'

export default FoodsByIdProvider
