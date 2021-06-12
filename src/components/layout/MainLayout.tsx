import { ReactElement, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

export type MainLayoutProps = {
  sidebarElement?: ReactElement
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box>
      <Box
        top="0"
        height="100vh"
        position="fixed"
        width="200px"
        bg="teal.600"
      />

      <Box px={3} ml="200px">
        {children}
      </Box>
    </Box>
  )
}
export default MainLayout
