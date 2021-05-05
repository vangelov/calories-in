import scrollbarSize from 'scrollbar-size'
import { Box } from '@chakra-ui/react'

function InvisibleScrollbar() {
  const scrollbarWidth = scrollbarSize()

  return <Box width={`${scrollbarWidth}px`} />
}

export default InvisibleScrollbar
