import { Box, Flex, Divider } from '@chakra-ui/react'
import { ReactNode, RefObject } from 'react'
import ElementContainer from './ElementContainer'
import useHasSideNavigation from './useHasSideNavigation'

type PageHeaderProps = {
  children: ReactNode
}

function PageHeader({ children }: PageHeaderProps) {
  return (
    <Flex justifyContent="center" position="sticky" top="0" zIndex={2}>
      <ElementContainer>
        <Box>{children}</Box>
        <Divider />
      </ElementContainer>
    </Flex>
  )
}

type PageBodyProps = {
  children: ReactNode
}

function PageBody({ children }: PageBodyProps) {
  return (
    <Flex justifyContent="center">
      <ElementContainer mx="auto">{children}</ElementContainer>
    </Flex>
  )
}

type PageFooterProps = {
  children: ReactNode
  footerContainerRef?: RefObject<HTMLDivElement>
}

function PageFooter({ children, footerContainerRef }: PageFooterProps) {
  const hasSideNavigation = useHasSideNavigation()

  return (
    <Box
      position="fixed"
      bottom="0"
      left={hasSideNavigation ? '200px' : 3}
      right={3}
      zIndex={2}
    >
      <ElementContainer mx="auto" ref={footerContainerRef}>
        <Divider />

        <Box py={3} bg="white">
          {children}
        </Box>
      </ElementContainer>
    </Box>
  )
}

type Props = {
  children: ReactNode
}

function Page({ children }: Props) {
  return (
    <Box>
      <Flex
        position="absolute"
        justifyContent="center"
        left="0"
        right="0"
        bottom="0"
        top="0"
        display={{ base: 'none', lg: 'flex' }}
      >
        <Box bg="white" boxShadow="lg" width="900px" height="100%" />
      </Flex>
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  )
}

export { PageHeader, PageBody, PageFooter }

export default Page
