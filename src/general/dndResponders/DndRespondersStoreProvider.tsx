import makeUseContext from 'general/makeUseContext'
import { createContext, ReactNode } from 'react'
import useDndRespondersStore, {
  DndRespondersStore,
} from './useDndRespondersStore'

const StateContext = createContext<DndRespondersStore[0] | undefined>(undefined)
const MethodsContext = createContext<DndRespondersStore[1] | undefined>(
  undefined
)
const useDndRespondersStoreState = makeUseContext(StateContext)
const useDndRespondersStoreMethods = makeUseContext(MethodsContext)

type Props = {
  children: ReactNode
}

function DndRespondersStoreProvider({ children }: Props) {
  const [state, methods] = useDndRespondersStore()

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useDndRespondersStoreMethods, useDndRespondersStoreState }

export default DndRespondersStoreProvider
