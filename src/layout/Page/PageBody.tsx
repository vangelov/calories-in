import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import ElementContainer from './ElementContainer'

type Props = {
  children: ReactNode
}

function PageBody({ children }: Props) {
  return (
    <Flex justifyContent="center">
      <ElementContainer mx="auto">{children}</ElementContainer>
    </Flex>
  )
}

export default PageBody
