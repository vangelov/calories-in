import { createContext, useContext } from 'react'
import { Stats } from 'core/stats'

type State = {
  [mealIndex: number]: Stats
}

type Action =
  | { type: 'updateStats'; mealIndex: number; stats: Stats }
  | { type: 'deleteStats'; mealIndex: number }

type Dispatch = (action: Action) => void

const StateContext = createContext<State | undefined>(undefined)
const DispatchContext = createContext<Dispatch | undefined>(undefined)

function useDietStatsDispatch() {
  const dispatch = useContext(DispatchContext)

  if (!dispatch) {
    throw new Error('Missing context provider')
  }

  return dispatch
}

function useDietStatsState() {
  const state = useContext(StateContext)

  if (!state) {
    throw new Error('Missing context provider')
  }

  return state
}

export type { Action, State }

export {
  useDietStatsState,
  useDietStatsDispatch,
  StateContext,
  DispatchContext,
}
