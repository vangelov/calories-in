import { Box, Flex, Divider } from '@chakra-ui/react'
import { useScreenSize } from 'general'
import { ReactNode, RefObject } from 'react'
import ElementContainer from './ElementContainer'

type PageHeaderProps = {
  children: ReactNode
}

function PageHeader({ children }: PageHeaderProps) {
  return (
    <Flex
      justifyContent="center"
      position="sticky"
      top="0"
      zIndex={2}
      bg="white"
    >
      <ElementContainer>
        <Box py={3}>{children}</Box>
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
  const screenSize = useScreenSize()
  const hasSideNavigation = screenSize >= 3

  return (
    <Box
      position="fixed"
      bottom="0"
      left={hasSideNavigation ? '200px' : 0}
      right={0}
      zIndex={2}
    >
      <ElementContainer bg="white" mx="auto" ref={footerContainerRef}>
        <Divider />
        <Box py={3} px={screenSize > 3 ? 0 : 3}>
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
  return <>{children}</>
}

export { PageHeader, PageBody, PageFooter }

export default Page
