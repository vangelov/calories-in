import { useDisclosure } from '@chakra-ui/hooks'
import { FoodsFilter } from 'core/foods'
import { useRef } from 'react'

function useGetFilters() {
  const popoverDisclosure = useDisclosure()
  const popoverOnChangeRef = useRef<(filter: FoodsFilter) => void>()

  function onGet() {
    popoverDisclosure.onOpen()

    popoverOnChangeRef.current = (filter: FoodsFilter) => {
      popoverDisclosure.onClose()
    }
  }

  return {
    onGet,
    popoverProps: {
      isOpen: popoverDisclosure.isOpen,
      onClose: popoverDisclosure.onClose,
    },
  }
}

export default useGetFilters
