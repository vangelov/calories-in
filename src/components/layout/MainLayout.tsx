import { ReactElement, ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'

export type MainLayoutProps = {
  sidebarElement?: ReactElement
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Flex height="100vh">
      <Box width="300px" bg="#28787a" />

      <Flex width="100%" height="100%" bg="white" justifyContent="center">
        <Flex
          maxWidth="950px"
          minWidth="900px"
          flexDirection="column"
          height="100%"
          bg="white"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
export default MainLayout
