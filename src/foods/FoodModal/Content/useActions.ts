import { useDisclosure } from '@chakra-ui/hooks'
import { useFoodsActions, useSubmitFoodForm } from 'foods'
import { Food } from 'foods'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'

type Params = {
  food?: Food
  onClose: () => void
  onFoodCreatedOrUpdated: (newFood: Food, oldFood?: Food) => void
}

function useActions({ food, onFoodCreatedOrUpdated, onClose }: Params) {
  const [isEditing, setIsEditing] = useState(!food)
  const deleteConfirmationDisclosure = useDisclosure()
  const foodsActions = useFoodsActions()
  const toast = useToast()

  const { onSubmit } = useSubmitFoodForm({
    onComplete: (newOrUpdatedFood: Food) => {
      onFoodCreatedOrUpdated(newOrUpdatedFood, food)
      onClose()
    },
  })

  function onToggleEdit() {
    setIsEditing(!isEditing)
  }

  function onDelete() {
    deleteConfirmationDisclosure.onOpen()
  }

  function onConfirmDelete() {
    if (food) {
      foodsActions.removeFood(food.id)
      toast({
        title: 'Food deleted',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      deleteConfirmationDisclosure.onClose()
      onClose()
    }
  }

  return {
    deleteConfirmationDisclosure,
    isEditing,
    onToggleEdit,
    onSubmit,
    onDelete,
    onConfirmDelete,
  }
}

export default useActions
