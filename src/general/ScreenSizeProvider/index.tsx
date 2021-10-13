import { useBreakpointValue } from '@chakra-ui/media-query'
import { ReactNode } from 'react'
import { ScreenSizeContext, ScreenSize } from './context'

type Props = {
  children: ReactNode
}

function ScreenSizeProvider({ children }: Props) {
  const screenSize = useBreakpointValue({
    base: ScreenSize.Base,
    sm: ScreenSize.Small,
    md: ScreenSize.Medium,
    lg: ScreenSize.Large,
    xl: ScreenSize.ExtraLarge,
  })

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
