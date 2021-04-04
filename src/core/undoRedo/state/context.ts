import { createContext, useContext } from 'react'

type State = {
  canUndo: boolean
  canRedo: boolean
}

type Dispatch = (state: State) => void

const StateContext = createContext<State | undefined>(undefined)
const SetStateContext = createContext<Dispatch | undefined>(undefined)

function useUndoRedoSetState() {
  const setState = useContext(SetStateContext)

  if (!setState) {
    throw new Error('Missing context provider in DragDropProvider')
  }

  return setState
}

function useUndoRedoState() {
  const state = useContext(StateContext)

  if (!state) {
    throw new Error('Missing context provider in DragDropProvider')
  }

  return state
}

export type { State }

export { useUndoRedoState, useUndoRedoSetState }

export { StateContext, SetStateContext }
