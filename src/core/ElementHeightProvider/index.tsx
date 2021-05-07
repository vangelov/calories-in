import { ReactNode, useState } from 'react'
import { State, StateContext, DispatchContext } from './context'
import useElementHeightUpdate from './useElementHeightUpdate'

const INITIAL_STATE: State = 0

type Props = {
  children: ReactNode
}

function ElementHeightProvder({ children }: Props) {
  const [state, setState] = useState<State>(INITIAL_STATE)

  return (
    <DispatchContext.Provider value={setState}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export * from './context'
export { useElementHeightUpdate }

export default ElementHeightProvder
