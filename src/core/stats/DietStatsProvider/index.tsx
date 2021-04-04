import { ReactNode, useReducer } from 'react'
import { StateContext, DispatchContext, Action, State } from './context'

const INITIAL_STATE: State = {}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'updateStats':
      return {
        ...state,
        [action.mealIndex]: action.stats,
      }
    case 'deleteStats':
      const newState = { ...state }
      delete newState[action.mealIndex]
      return newState
  }
}

type Props = {
  children: ReactNode
}

function DietStatsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export * from './context'

export default DietStatsProvider
