import { Box, BoxProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { ForwardedRef, ReactNode, forwardRef } from 'react'

type Props = {
  children: ReactNode
  forwardedRef?: ForwardedRef<HTMLDivElement>
} & BoxProps

const HiddenScrollbarsBox = styled(Box)`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

function ElementContainer({ children, forwardedRef, ...rest }: Props) {
  return (
    <Box flex={1} ref={forwardedRef} maxWidth="900px" {...rest}>
      {children}
    </Box>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <ElementContainer {...props} forwardedRef={ref} />
))
