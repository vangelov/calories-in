import { Box, BoxProps } from '@chakra-ui/react'
import { ForwardedRef, ReactNode, forwardRef } from 'react'

type Props = {
  children: ReactNode
  forwardedRef?: ForwardedRef<HTMLDivElement>
} & BoxProps

function ElementContainer({ children, forwardedRef, ...rest }: Props) {
  return (
    <Box flex={1} ref={forwardedRef} bg="gray.50" maxWidth="1000px" {...rest}>
      {children}
    </Box>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <ElementContainer {...props} forwardedRef={ref} />
))
