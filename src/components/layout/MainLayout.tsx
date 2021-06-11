import { ReactElement, ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'

export type MainLayoutProps = {
  sidebarElement?: ReactElement
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box>
      <Box top="0" height="100vh" position="fixed" width="200px" bg="yellow" />

      <Box px={3} ml="200px">
        {children}
      </Box>
    </Box>
  )
}
export default MainLayout
