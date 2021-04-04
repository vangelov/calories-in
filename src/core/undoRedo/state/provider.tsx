import { useState, ReactNode } from 'react'
import { State, SetStateContext, StateContext } from './context'

type Props = {
  children: ReactNode
}

const INITIAL_STATE: State = { canUndo: false, canRedo: false }

function UndoRedoStateProvider({ children }: Props) {
  const [state, setState] = useState(INITIAL_STATE)

  return (
    <SetStateContext.Provider value={setState}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </SetStateContext.Provider>
  )
}

export default UndoRedoStateProvider
