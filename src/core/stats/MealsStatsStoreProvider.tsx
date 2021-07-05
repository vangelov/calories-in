import makeUseContext from 'general/makeUseContext'
import { createContext, ReactNode } from 'react'
import useMealsStatsStore, { MealsStatsStore } from './useMealsStatsStore'

const StateContext = createContext<MealsStatsStore[0] | undefined>(undefined)
const MethodsContext = createContext<MealsStatsStore[1] | undefined>(undefined)
const useMealsStatsStoreState = makeUseContext(StateContext)
const useMealsStatsStoreMethods = makeUseContext(MethodsContext)

type Props = {
  children: ReactNode
}

function MealsStateStoreProvider({ children }: Props) {
  const [state, methods] = useMealsStatsStore()

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useMealsStatsStoreState, useMealsStatsStoreMethods }

export default MealsStateStoreProvider
