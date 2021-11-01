import { Food } from 'foods'
import { RefObject, useState } from 'react'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import useDeleteFood from './useDeleteFood'
import Form from './Form'
import FoodFormProvider from './FoodFormProvider'

type Props = {
  onClose: () => void
  title: string
  nameInputRef: RefObject<HTMLInputElement>
  food?: Food
  onFoodCreatedOrUpdated?: (newFood: Food, oldFood?: Food) => void
  onFoodDeleted?: (food: Food) => void
}

function Content({
  onClose,
  nameInputRef,
  title,
  food,
  onFoodCreatedOrUpdated,
  onFoodDeleted,
}: Props) {
  const canEdit = Boolean(food && food.addedByUser)
  const deleteFood = useDeleteFood({ food, onClose, onFoodDeleted })
  const [isEditing, setIsEditing] = useState(!food)

  function onToggleEdit() {
    setIsEditing(!isEditing)
  }

  return (
    <FoodFormProvider food={food}>
      <Form
        nameInputRef={nameInputRef}
        title={title}
        canEdit={canEdit}
        onToggleEdit={onToggleEdit}
        food={food}
        onDelete={deleteFood.onDelete}
        onFoodCreatedOrUpdated={onFoodCreatedOrUpdated}
        onClose={onClose}
        isEditing={isEditing}
      />

      <DeleteConfirmationModal
        text="Deleting this food will remove it from all meal plans where it's being used."
        confirmButtonLabel="Delete food"
        isOpen={deleteFood.deleteConfirmationDisclosure.isOpen}
        onCancel={deleteFood.deleteConfirmationDisclosure.onClose}
        onConfirm={deleteFood.onConfirmDelete}
      />
    </FoodFormProvider>
  )
}

export type { Props }

export default Content
