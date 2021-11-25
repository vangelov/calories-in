import { ForwardedRef, ReactNode } from 'react'
import { Box, BoxProps, Center, Fade, Text } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { useSameOrPreviousValue } from 'general'

type Props = {
  children: ReactNode
  count: number
  forwardedRef?: ForwardedRef<HTMLDivElement>
} & BoxProps

function Badge({ children, count, forwardedRef, ...rest }: Props) {
  const prevCount = useSameOrPreviousValue(count)

  return (
    <Box position="relative" ref={forwardedRef} {...rest}>
      {children}

      <Fade in={count > 0}>
        <Center
          width="20px"
          top="-5px"
          right="-5px"
          height="20px"
          bg="teal.500"
          position="absolute"
          borderRadius="full"
          pointerEvents="none"
          boxShadow="base"
        >
          <Text fontWeight="bold" fontSize="xs" textColor="white">
            {count === 0 ? prevCount : count}
          </Text>
        </Center>
      </Fade>
    </Box>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <Badge {...props} forwardedRef={ref} />
))
