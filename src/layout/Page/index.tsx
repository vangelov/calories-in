import { Box, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

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

export { default as PageHeader } from './PageHeader'
export { default as PageBody } from './PageBody'
export { default as PageFooter } from './PageFooter'

export default Page
