import makeUseContext from 'general/makeUseContext'
import { createContext, ReactNode } from 'react'
import useFoodsFilterStore, { FoodsFilterStore } from './useFoodsFilterStore'

const StateContext = createContext<FoodsFilterStore[0] | undefined>(undefined)
const MethodsContext = createContext<FoodsFilterStore[1] | undefined>(undefined)
const useFoodsFilterStoreState = makeUseContext(StateContext)
const useFoodsFilterStoreMethods = makeUseContext(MethodsContext)

type Props = {
  children: ReactNode
}

function FoodsStoreProvider({ children }: Props) {
  const [state, methods] = useFoodsFilterStore()

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useFoodsFilterStoreState, useFoodsFilterStoreMethods }

export default FoodsStoreProvider
