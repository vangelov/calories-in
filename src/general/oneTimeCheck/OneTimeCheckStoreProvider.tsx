import makeUseContext from 'general/makeUseContext'
import { createContext, ReactNode } from 'react'
import useOneTimeCheckStore, { OneTimeCheckStore } from './useOneTimeCheckStore'

const MethodsContext = createContext<OneTimeCheckStore | undefined>(undefined)
const useOneTimeCheckStoreMethods = makeUseContext(MethodsContext)

type Props = {
  children: ReactNode
}

function OneTimeCheckStoreProvider({ children }: Props) {
  const methods = useOneTimeCheckStore()

  return (
    <MethodsContext.Provider value={methods}>
      {children}
    </MethodsContext.Provider>
  )
}

export { useOneTimeCheckStoreMethods }

export default OneTimeCheckStoreProvider
