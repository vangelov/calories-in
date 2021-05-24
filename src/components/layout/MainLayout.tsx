import { ReactElement, ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'

export type MainLayoutProps = {
  sidebarElement?: ReactElement
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Flex height="100vh">
      <Box width="150px" bg="gray" />
      <Flex flexDirection="column" height="100%" flex={1} bg="gray.50">
        {children}
      </Flex>
    </Flex>
  )
}
export default MainLayout
