import { useBreakpointValue } from '@chakra-ui/media-query'

enum ScreenSize {
  Base = 0,
  Small,
  Medium,
  Large,
  ExtraLarge,
}

function useScreenSize() {
  const screenSize = useBreakpointValue({
    base: ScreenSize.Base,
    sm: ScreenSize.Small,
    md: ScreenSize.Medium,
    lg: ScreenSize.Large,
    xl: ScreenSize.ExtraLarge,
  })

  if (screenSize === undefined) {
    return ScreenSize.Base
  }

  return screenSize
}

export { ScreenSize }

export default useScreenSize
