import { ReactElement, ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'

export type MainLayoutProps = {
  sidebarElement: ReactElement
  children: ReactNode
}

function MainLayout({ children, sidebarElement }: MainLayoutProps) {
  return (
    <Flex height="100vh">
      <Box width="300px">{sidebarElement}</Box>
      <Flex flexDirection="column" height="100%" flex={1} bg="green">
        {children}
      </Flex>
    </Flex>
  )
}
export default MainLayout
