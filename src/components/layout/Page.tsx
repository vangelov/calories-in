import { Box, Flex, Divider } from '@chakra-ui/react'
import { useScreenSize } from 'components/general/ScreenSizeProvider'
import { ReactNode, RefObject, useLayoutEffect } from 'react'
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
      <ElementContainer>{children}</ElementContainer>
    </Flex>
  )
}

type PageFooterProps = {
  children: ReactNode
  footerContainerRef?: RefObject<HTMLDivElement>
  footerContainerScrollLeft?: number
}

function PageFooter({
  children,
  footerContainerRef,
  footerContainerScrollLeft = 0,
}: PageFooterProps) {
  const screenSize = useScreenSize()
  const hasSideNavigation = screenSize >= 3

  useLayoutEffect(() => {
    if (footerContainerRef && footerContainerRef.current) {
      footerContainerRef.current.scrollLeft = footerContainerScrollLeft
    }
  }, [footerContainerScrollLeft, footerContainerRef])

  return (
    <Box
      position="fixed"
      bottom="0"
      left={hasSideNavigation ? '200px' : 0}
      right={0}
      zIndex={2}
    >
      <Flex justifyContent="center" bg="white">
        <ElementContainer>
          <Divider />
        </ElementContainer>
      </Flex>

      <Flex justifyContent="center" bg="white">
        <ElementContainer overflowX="scroll" ref={footerContainerRef}>
          <Box py={3} mx={screenSize > 3 ? 0 : 3}>
            {children}
          </Box>
        </ElementContainer>
      </Flex>
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
