import {
  createContext,
  ReactNode,
  useReducer,
  useContext,
  useEffect,
} from 'react'
import { Stats } from './types'
import { sumStats } from './utils'

type State = {
  [mealIndex: number]: Stats
}

const INITIAL_STATE: State = {}

type Action =
  | { type: 'updateStats'; mealIndex: number; stats: Stats }
  | { type: 'deleteStats'; mealIndex: number }
type Dispatch = (action: Action) => void

const StateContext = createContext<State | undefined>(undefined)
const DispatchContext = createContext<Dispatch | undefined>(undefined)

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

function useUpdateMealStats(mealIndex: number, stats: Stats) {
  const dispatch = useContext(DispatchContext)

  if (!dispatch) {
    throw new Error('Missing context provider')
  }

  useEffect(() => {
    dispatch({ type: 'updateStats', mealIndex, stats })

    return () => {
      dispatch({ type: 'deleteStats', mealIndex })
    }
  })
}

function useDietStats(): Stats {
  const state = useContext(StateContext)

  if (!state) {
    throw new Error('Missing context provider')
  }

  const mealsStats = Object.values(state)

  return sumStats(mealsStats)
}

export { useUpdateMealStats, useDietStats }

export default DietStatsProvider
