import { chakra } from '@chakra-ui/react'
import { Plus, Trash2, Copy, Edit } from 'react-feather'
import { MealForm } from 'meals'
import { MenuOrDrawerItem, MenuOrDrawerSeparator } from 'general'

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

function getMenuOrDrawerItems({
  onRemove,
  onAddIngredient,
  onClone,
  onEditNotes,
  mealForm,
}: Params) {
  return [
    <MenuOrDrawerItem
      icon={<PlusStyled pointerEvents="none" />}
      key="addFoods"
      onClick={() => onAddIngredient()}
    >
      Add foods
    </MenuOrDrawerItem>,
    <MenuOrDrawerSeparator key="divider" />,
    <MenuOrDrawerItem
      key="editNotes"
      icon={<EditStyled pointerEvents="none" />}
      onClick={() => onEditNotes()}
    >
      {mealForm.notes ? 'Edit notes' : 'Add notes'}
    </MenuOrDrawerItem>,
    <MenuOrDrawerItem
      key="duplicateMeal"
      icon={<CopyStyled pointerEvents="none" />}
      onClick={() => onClone()}
    >
      Duplicate
    </MenuOrDrawerItem>,

    <MenuOrDrawerItem
      key="remove"
      icon={<Trash2Styled pointerEvents="none" />}
      onClick={() => onRemove()}
    >
      Remove
    </MenuOrDrawerItem>,
  ]
}

export default getMenuOrDrawerItems
