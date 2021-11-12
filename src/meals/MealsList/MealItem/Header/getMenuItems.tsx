import { chakra } from '@chakra-ui/react'
import { Plus, Trash2, Copy, Edit } from 'react-feather'
import { MenuItem } from 'general'
import { MealForm } from 'meals'

const PlusStyled = chakra(Plus)
const Trash2Styled = chakra(Trash2)
const CopyStyled = chakra(Copy)
const EditStyled = chakra(Edit)

type Params = {
  onRemove: () => void
  onEditNotes: () => void
  onAddIngredient: () => void
  onClone: () => void
  mealForm: MealForm
}

function getMenuItems({
  onRemove,
  onAddIngredient,
  onClone,
  onEditNotes,
  mealForm,
}: Params) {
  return [
    <MenuItem key="addFoods" onClick={() => onAddIngredient()}>
      <PlusStyled pointerEvents="none" size={16} mr={3} />
      Add foods
    </MenuItem>,
    <MenuItem key="editNotes" onClick={() => onEditNotes()}>
      <EditStyled pointerEvents="none" size={16} mr={3} />
      {mealForm.notes ? 'Edit notes' : 'Add notes'}
    </MenuItem>,
    <MenuItem key="duplicateMeal" onClick={() => onClone()}>
      <CopyStyled pointerEvents="none" size={16} mr={3} />
      Duplicate meal
    </MenuItem>,
    <MenuItem key="remove" onClick={() => onRemove()}>
      <Trash2Styled pointerEvents="none" size={16} mr={3} />
      Remove meal
    </MenuItem>,
  ]
}

export default getMenuItems
