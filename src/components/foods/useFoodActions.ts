import { useDisclosure } from '@chakra-ui/hooks'
import { Food } from 'core/types'
import { useRef, useState } from 'react'

function useFoodActions() {
  const modalDisclosure = useDisclosure()
  const onModalSaveRef = useRef<(food: Food) => void>(() => {})
  const [modalTitle, setModalTitle] = useState('')
  const [selectedFood, setSelectedFood] = useState<Food>()
  const [canEdit, setCanEdit] = useState(false)

  function onCreate() {
    setModalTitle('Create food')
    modalDisclosure.onOpen()
    setSelectedFood(undefined)
    setCanEdit(true)

    onModalSaveRef.current = (food: Food) => {
      modalDisclosure.onClose()
    }
  }

  function onPreview(food: Food) {
    setModalTitle('Food details')
    modalDisclosure.onOpen()
    setSelectedFood(food)
    setCanEdit(false)

    onModalSaveRef.current = (food: Food) => {
      modalDisclosure.onClose()
    }
  }

  return {
    onCreate,
    onPreview,
    foodModalProps: {
      canEdit,
      title: modalTitle,
      isOpen: modalDisclosure.isOpen,
      onClose: modalDisclosure.onClose,
      onSave: onModalSaveRef.current,
      food: selectedFood,
    },
  }
}

export default useFoodActions
