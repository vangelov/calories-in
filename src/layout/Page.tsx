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
        <Box borderWidth={{ base: 0, lg: 1 }} borderTopWidth={0}>
          {children}
        </Box>
        <Divider display={{ base: 'block', lg: 'none' }} />
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
        <Divider display={{ base: 'block', lg: 'none' }} />

        <Box
          py={3}
          bg="white"
          borderWidth={{ base: 0, lg: 1 }}
          borderBottomWidth={0}
        >
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
