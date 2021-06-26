import { createContext, useContext } from 'react'

type OneTimeCheckMethods = {
  checkAndReset(key: string): boolean
  set(key: string): void
}

const OneTimeCheckContext = createContext<OneTimeCheckMethods | undefined>(
  undefined
)

function useOneTimeCheck() {
  const state = useContext(OneTimeCheckContext)

  if (!state) {
    throw new Error('Provider missing')
  }

  return state
}

export { OneTimeCheckContext, useOneTimeCheck }
