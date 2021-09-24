import { useDisclosure } from '@chakra-ui/hooks'
import { Food } from 'foods'
import { useState } from 'react'

type OnOpenParams = {
  foodsToImport?: Food[]
}

function useFoodsListModalDisclosure() {
  const disclosure = useDisclosure()
  const [foodsToImport, setFoodsToImport] = useState<Food[]>()

  function onOpen({ foodsToImport }: OnOpenParams = {}) {
    setFoodsToImport(foodsToImport)
    disclosure.onOpen()
  }

  return {
    ...disclosure,
    onOpen,
    foodsToImport,
  }
}

type FoodsListModalDisclosure = ReturnType<typeof useFoodsListModalDisclosure>

export type { FoodsListModalDisclosure }

export default useFoodsListModalDisclosure
