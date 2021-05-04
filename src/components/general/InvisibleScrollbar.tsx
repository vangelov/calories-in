import { useScrollbarSize } from 'react-scrollbar-size'
import { Box } from '@chakra-ui/react'

function InvisibleScrollbar() {
  const { width: scrollbarWidth } = useScrollbarSize()
  return <Box width={`${scrollbarWidth}px`} height="0" />
}

export default InvisibleScrollbar
