import { Flex, FlexProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & FlexProps

function RightAligned({ children, ...rest }: Props) {
  return (
    <Flex
      width="100%"
      height="100%"
      alignItems="flex-end"
      justifyContent="center"
      flexDirection="column"
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default RightAligned
