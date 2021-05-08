import { ReactNode, useCallback, useRef } from 'react'
import { StateContext, SetStateContext } from './context'

type Props = {
  children: ReactNode
}

function InitialEnergyProvider({ children }: Props) {
  const initialEnergyRef = useRef(0)

  const setState = useCallback((newValue: number) => {
    if (initialEnergyRef.current === 0) {
      initialEnergyRef.current = newValue
    }
  }, [])

  return (
    <SetStateContext.Provider value={setState}>
      <StateContext.Provider value={initialEnergyRef}>
        {children}
      </StateContext.Provider>
    </SetStateContext.Provider>
  )
}

export { useInitialEnergyState, useInitialEnergySetState } from './context'

export default InitialEnergyProvider
