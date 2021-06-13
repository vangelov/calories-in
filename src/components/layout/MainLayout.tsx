import { ReactElement, ReactNode } from 'react'
import { Box, useBreakpointValue } from '@chakra-ui/react'

export type MainLayoutProps = {
  sidebarElement?: ReactElement
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  const screenSize = useBreakpointValue<number>({
    base: 0,
    sm: 1,
    md: 2,
    lg: 3,
  })
  const hasSideNavigation = screenSize !== undefined && screenSize >= 3

  return (
    <Box>
      {hasSideNavigation && (
        <Box
          top="0"
          height="100vh"
          position="fixed"
          width="200px"
          bg="teal.600"
        />
      )}

      <Box px={3} ml={hasSideNavigation ? '200px' : 0}>
        {children}
      </Box>
    </Box>
  )
}
export default MainLayout
