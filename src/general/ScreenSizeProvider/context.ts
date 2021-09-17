import { createContext, useContext } from 'react'

const ScreenSizeContext = createContext<number | undefined>(undefined)

function useScreenSize() {
  const screenSize = useContext(ScreenSizeContext)

  if (screenSize === undefined) {
    throw new Error('Provider missing')
  }

  return screenSize
}

export { useScreenSize, ScreenSizeContext }
