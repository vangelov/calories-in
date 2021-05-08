import { createContext, MutableRefObject, useContext } from 'react'

type State = MutableRefObject<number>
type SetState = (newValue: number) => void

const StateContext = createContext<State | undefined>(undefined)
const SetStateContext = createContext<SetState | undefined>(undefined)

function useInitialEnergySetState() {
  const dispatch = useContext(SetStateContext)

  if (!dispatch) {
    throw new Error('Missing context provider in ElementHeightProvider')
  }

  return dispatch
}

function useInitialEnergyState() {
  const state = useContext(StateContext)

  if (state === undefined) {
    throw new Error('Missing context provider in useElementHeightState')
  }

  return state
}

export type { State }

export {
  StateContext,
  SetStateContext,
  useInitialEnergyState,
  useInitialEnergySetState,
}
