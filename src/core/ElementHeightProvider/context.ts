import React, { createContext, useContext, SetStateAction } from 'react'

type State = number
type Dispatch = React.Dispatch<SetStateAction<State>>

const StateContext = createContext<State | undefined>(undefined)
const DispatchContext = createContext<Dispatch | undefined>(undefined)

function useElementHeightDispatch() {
  const dispatch = useContext(DispatchContext)

  if (!dispatch) {
    throw new Error('Missing context provider in ElementHeightProvider')
  }

  return dispatch
}

function useElementHeightState() {
  const state = useContext(StateContext)

  if (state === undefined) {
    throw new Error('Missing context provider in useElementHeightState')
  }

  return state
}

export type { State }

export {
  StateContext,
  DispatchContext,
  useElementHeightState,
  useElementHeightDispatch,
}
