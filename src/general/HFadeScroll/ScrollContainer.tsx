import { Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'

const ScrollContainer = styled(Flex)`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

export default ScrollContainer
