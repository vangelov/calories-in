import { createContext, useContext } from 'react'

enum ScreenSize {
  Base = 0,
  Small,
  Medium,
  Large,
  ExtraLarge,
}

const ScreenSizeContext = createContext<ScreenSize | undefined>(undefined)

function useScreenSize() {
  const screenSize = useContext(ScreenSizeContext)

  if (screenSize === undefined) {
    throw new Error('Provider missing')
  }

  return screenSize
}

export { useScreenSize, ScreenSizeContext, ScreenSize }
