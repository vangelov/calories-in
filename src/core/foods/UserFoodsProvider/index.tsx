import { Food } from 'core/types'
import { ReactNode, useReducer } from 'react'
import { State, Action, StateContext, DispatchContext } from './context'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addFood':
      const index = state.findIndex(
        ({ categoryId }) => categoryId === action.food.categoryId
      )
      return [...state.slice(0, index), action.food, ...state.slice(index)]

    case 'removeFood':
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
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
