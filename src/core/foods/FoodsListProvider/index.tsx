import { Food } from 'core/types'
import { ReactNode, useReducer } from 'react'
import { State, Action, StateContext, DispatchContext } from './context'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addFood':
      return [
        ...state.slice(0, action.index),
        action.food,
        ...state.slice(action.index + 1),
      ]

    case 'removeFood':
      return state.filter(food => food.id !== action.foodId)
  }
}

type Props = {
  initialFoods: Food[]
  children: ReactNode
}

function FoodsListProvider({ children, initialFoods }: Props) {
  const [state, dispatch] = useReducer(reducer, initialFoods)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export * from './context'

export default FoodsListProvider
