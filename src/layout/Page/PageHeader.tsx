import { Box, Flex } from '@chakra-ui/react'
import { ForwardedRef, forwardRef, ReactNode } from 'react'
import ElementContainer from './ElementContainer'

type Props = {
  children: ReactNode
  forwardedRef?: ForwardedRef<HTMLDivElement>
}

function PageHeader({ children, forwardedRef }: Props) {
  return (
    <Flex
      ref={forwardedRef}
      justifyContent="center"
      position="sticky"
      top="0"
      bg="white"
      zIndex={2}
      boxShadow="md"
      px={3}
    >
      <ElementContainer>
        <Box>{children}</Box>
      </ElementContainer>
    </Flex>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <PageHeader forwardedRef={ref} {...props} />
))
