import { ReactElement, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import { useScreenSize } from 'components/general/ScreenSizeProvider'

export type MainLayoutProps = {
  sidebarElement?: ReactElement
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  const screenSize = useScreenSize()
  const hasSideNavigation = screenSize >= 3

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
