import { createContext, useContext } from 'react'

type LastFieldIdMethods = {
  getAndResetLastFieldId(fieldId: string): boolean
  setLastFieldId(fieldId: string): void
}

const LastFieldIdContext = createContext<LastFieldIdMethods | undefined>(
  undefined
)

function useLastFieldIdProvider() {
  const state = useContext(LastFieldIdContext)

  if (!state) {
    throw new Error('Provider missing')
  }

  return state
}

export { LastFieldIdContext, useLastFieldIdProvider }
