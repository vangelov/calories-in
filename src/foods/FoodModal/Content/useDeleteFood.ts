import { useDisclosure } from '@chakra-ui/hooks'
import { useFoodsActions } from 'foods'
import { Food } from 'foods'
import { useToast } from '@chakra-ui/react'

type Params = {
  food?: Food
  onClose: () => void
  onFoodDeleted?: (food: Food) => void
}

function useDeleteFood({ food, onClose, onFoodDeleted }: Params) {
  const deleteConfirmationDisclosure = useDisclosure()
  const foodsActions = useFoodsActions()
  const toast = useToast()

  function onDelete() {
    deleteConfirmationDisclosure.onOpen()
  }

  function onConfirmDelete() {
    if (food) {
      foodsActions.removeFood(food.id)
      toast({
        position: 'top',
        title: 'Food deleted',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      deleteConfirmationDisclosure.onClose()
      onFoodDeleted && onFoodDeleted(food)
      onClose()
    }
  }

  return {
    deleteConfirmationDisclosure,
    onDelete,
    onConfirmDelete,
  }
}

export default useDeleteFood
