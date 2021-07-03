import makeUseContext from 'general/makeUseContext'
import { createContext, ReactNode } from 'react'
import useFormChangesCapabilitiesStore, {
  FormChangesCapabilitiesStore,
} from './useFormChangesCapabilitiesStore'

const StateContext = createContext<FormChangesCapabilitiesStore[0] | undefined>(
  undefined
)
const MethodsContext = createContext<
  FormChangesCapabilitiesStore[1] | undefined
>(undefined)
const useFormChangesCapabilitiesStoreState = makeUseContext(StateContext)
const useFormChangesCapabilitiesStoreMethods = makeUseContext(MethodsContext)

type Props = {
  children: ReactNode
}

function FormChangesCapabilitiesStoreProvider({ children }: Props) {
  const [state, methods] = useFormChangesCapabilitiesStore()

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export {
  useFormChangesCapabilitiesStoreState,
  useFormChangesCapabilitiesStoreMethods,
}

export default FormChangesCapabilitiesStoreProvider
