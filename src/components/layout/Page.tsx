import { Box, Flex, Divider } from '@chakra-ui/react'
import { useScreenSize } from 'components/general/ScreenSizeProvider'
import { ReactElement, RefObject, useLayoutEffect } from 'react'
import ElementContainer from './ElementContainer'

type Props = {
  headerElement: ReactElement
  bodyElement: ReactElement
  footerElement: ReactElement
  footerContainerRef?: RefObject<HTMLDivElement>
  footerContainerScrollLeft?: number
}

function Page({
  headerElement,
  bodyElement,
  footerElement,
  footerContainerRef,
  footerContainerScrollLeft = 0,
}: Props) {
  const screenSize = useScreenSize()
  const hasSideNavigation = screenSize >= 3

  useLayoutEffect(() => {
    if (footerContainerRef && footerContainerRef.current) {
      footerContainerRef.current.scrollLeft = footerContainerScrollLeft
    }
  }, [footerContainerScrollLeft, footerContainerRef])

  return (
    <>
      <Flex
        justifyContent="center"
        position="sticky"
        top="0"
        zIndex={2}
        bg="white"
      >
        <ElementContainer>
          <Box py={3}>{headerElement}</Box>
          <Divider />
        </ElementContainer>
      </Flex>

      <Flex justifyContent="center">
        <ElementContainer>{bodyElement}</ElementContainer>
      </Flex>

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
              {footerElement}
            </Box>
          </ElementContainer>
        </Flex>
      </Box>
    </>
  )
}

export default Page
