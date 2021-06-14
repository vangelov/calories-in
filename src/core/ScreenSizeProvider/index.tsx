import { useBreakpointValue } from '@chakra-ui/media-query'
import { ReactNode } from 'react'
import { ScreenSizeContext } from './context'

type Props = {
  children: ReactNode
}

function ScreenSizeProvider({ children }: Props) {
  const screenSize = useBreakpointValue({ base: 0, sm: 1, md: 2, lg: 3, xl: 4 })

  if (screenSize === undefined) {
    return null
  }

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  )
}

export * from './context'

export default ScreenSizeProvider
