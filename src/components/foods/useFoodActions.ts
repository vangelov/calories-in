import { useDisclosure } from '@chakra-ui/hooks'
import { Food } from 'core/types'
import { useRef, useState } from 'react'

function useFoodActions() {
  const modalDisclosure = useDisclosure()
  const onModalSaveRef = useRef<(food: Food) => void>(() => {})
  const [modalTitle, setModalTitle] = useState('')

  function onCreate() {
    setModalTitle('Create food')
    modalDisclosure.onOpen()

    onModalSaveRef.current = (food: Food) => {
      modalDisclosure.onClose()
    }
  }

  return {
    onCreate,
    foodModalProps: {
      title: modalTitle,
      isOpen: modalDisclosure.isOpen,
      onClose: modalDisclosure.onClose,
      onSave: onModalSaveRef.current,
    },
  }
}

export default useFoodActions
