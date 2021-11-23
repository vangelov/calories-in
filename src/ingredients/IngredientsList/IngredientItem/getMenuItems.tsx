import { chakra } from '@chakra-ui/react'
import { MenuItem, MenuDivider, MenuHeader } from 'general'
import { IngredientForm } from 'ingredients'
import { Trash2, Info, Edit } from 'react-feather'

const InfoStyled = chakra(Info)
const Trash2Styled = chakra(Trash2)
const EditStyled = chakra(Edit)

type Props = {
  onEditNotes: () => void
  onRemove: () => void
  onViewFoodDetails: () => void
  ingredientForm: IngredientForm
}

function getMenuItems({
  ingredientForm,
  onRemove,
  onViewFoodDetails,
  onEditNotes,
}: Props) {
  return [
    <MenuHeader key="header">Food</MenuHeader>,
    <MenuItem key="viewDetails" onClick={onViewFoodDetails}>
      <InfoStyled pointerEvents="none" size={16} mr={3} />
      View details
    </MenuItem>,
    <MenuDivider key="divider" />,
    <MenuItem key="editNotes" onClick={onEditNotes}>
      <EditStyled pointerEvents="none" size={16} mr={3} />
      {ingredientForm.notes ? 'Edit notes' : 'Add notes'}
    </MenuItem>,
    <MenuItem key="remove" onClick={onRemove}>
      <Trash2Styled pointerEvents="none" size={16} mr={3} />
      Remove
    </MenuItem>,
  ]
}

export default getMenuItems
