import { chakra } from '@chakra-ui/react'
import { IngredientForm } from 'ingredients'
import { Trash2, Info, Edit } from 'react-feather'
import { MenuOrDrawerItem, MenuOrDrawerSeparator } from 'general'

const InfoStyled = chakra(Info)
const Trash2Styled = chakra(Trash2)
const EditStyled = chakra(Edit)

type Props = {
  onEditNotes: () => void
  onRemove: () => void
  onViewFoodDetails: () => void
  ingredientForm: IngredientForm
}

function getMenuOrDrawerItems({
  ingredientForm,
  onRemove,
  onViewFoodDetails,
  onEditNotes,
}: Props) {
  return [
    <MenuOrDrawerItem
      key="viewDetails"
      icon={<InfoStyled />}
      onClick={onViewFoodDetails}
    >
      View details
    </MenuOrDrawerItem>,
    <MenuOrDrawerSeparator key="separator" />,
    <MenuOrDrawerItem
      key="editNotes"
      icon={<EditStyled />}
      onClick={onEditNotes}
    >
      {ingredientForm.notes ? 'Edit notes' : 'Add notes'}
    </MenuOrDrawerItem>,
    <MenuOrDrawerItem key="remove" icon={<Trash2Styled />} onClick={onRemove}>
      Remove
    </MenuOrDrawerItem>,
  ]
}

export default getMenuOrDrawerItems
