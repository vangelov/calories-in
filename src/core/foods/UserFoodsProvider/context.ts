import { createContext, useContext } from 'react'
import { Food } from 'core/types'

type State = Food[]

type Action =
  | { type: 'addFood'; food: Food }
  | { type: 'removeFood'; index: number }

type Dispatch = (action: Action) => void

const StateContext = createContext<State | undefined>(undefined)
const DispatchContext = createContext<Dispatch | undefined>(undefined)

function useUserFoodsDispatch() {
  const dispatch = useContext(DispatchContext)

  if (!dispatch) {
    throw new Error('Missing dispatch context provider in FoodsListProvider')
  }

  return dispatch
}

function useUserFoodsState() {
  const state = useContext(StateContext)

  if (!state) {
    throw new Error('Missing state context provider in FoodsListProvider')
  }

  return state
}

export type { State, Action }

export {
  StateContext,
  DispatchContext,
  useUserFoodsDispatch,
  useUserFoodsState,
}
