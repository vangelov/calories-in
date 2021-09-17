import { chakra } from '@chakra-ui/react'
import { Plus, Trash2 } from 'react-feather'
import { MenuItem } from 'general'

const PlusStyled = chakra(Plus)
const Trash2Styled = chakra(Trash2)

type Params = {
  onRemove: () => void
  onAddIngredient: () => void
}

function getMenuItems({ onRemove, onAddIngredient }: Params) {
  return [
    <MenuItem key="addFoods" onClick={onAddIngredient}>
      <PlusStyled pointerEvents="none" size={20} mr={3} />
      Add foods
    </MenuItem>,
    <MenuItem key="remove" onClick={onRemove}>
      <Trash2Styled pointerEvents="none" size={20} mr={3} />
      Remove
    </MenuItem>,
  ]
}

export default getMenuItems
