import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import ElementContainer from './ElementContainer'

type Props = {
  children: ReactNode
}

function PageBody({ children }: Props) {
  return (
    <Flex px={3} width="100%" bg="gray.50" justifyContent="center">
      <ElementContainer width="100%">{children}</ElementContainer>
    </Flex>
  )
}

export default PageBody
