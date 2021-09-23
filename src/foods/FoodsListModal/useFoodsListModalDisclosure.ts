import { useDisclosure } from '@chakra-ui/hooks'
import { useState } from 'react'
import { Action } from './types'

function useFoodsListModalDisclosure() {
  const disclosure = useDisclosure()
  const [action, setAction] = useState<Action>('import')

  function onOpen(action: Action) {
    setAction(action)
    disclosure.onOpen()
  }

  return {
    ...disclosure,
    onOpen,
    action,
  }
}

export default useFoodsListModalDisclosure
