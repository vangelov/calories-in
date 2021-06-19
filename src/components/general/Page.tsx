import { Box, Flex, Divider, BoxProps } from '@chakra-ui/react'
import { useScreenSize } from 'core/ScreenSizeProvider'
import { ReactElement, ReactNode } from 'react'
import styled from '@emotion/styled'

type Props = {
  headerElement: ReactElement
  bodyElement: ReactElement
  footerElement: ReactElement
}

const TestBox = styled(Box)`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

function ElementContainer({
  children,
  ...rest
}: { children: ReactNode } & BoxProps) {
  return (
    <TestBox flex={1} maxWidth="900px" {...rest}>
      {children}
    </TestBox>
  )
}

function Page({ headerElement, bodyElement, footerElement }: Props) {
  const screenSize = useScreenSize()
  const hasSideNavigation = screenSize >= 3
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
        <ElementContainer>
          {bodyElement}
          <Box height="100px" />
        </ElementContainer>
      </Flex>

      <Box
        position="fixed"
        bottom="0"
        left={hasSideNavigation ? '200px' : 0}
        right={0}
        zIndex={2}
      >
        <Flex justifyContent="center" bg="white">
          <ElementContainer overflowX="scroll">
            <Divider />
          </ElementContainer>
        </Flex>

        <Flex justifyContent="center" bg="white">
          <ElementContainer overflowX="scroll">
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
