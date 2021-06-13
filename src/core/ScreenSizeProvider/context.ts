import { createContext, useContext } from 'react'

const ScreenSizeContext = createContext<number | undefined>(undefined)

function useScreenSize() {
  const state = useContext(ScreenSizeContext)

  if (state === undefined) {
    throw new Error('Provider missing')
  }

  return state
}

export { useScreenSize, ScreenSizeContext }
