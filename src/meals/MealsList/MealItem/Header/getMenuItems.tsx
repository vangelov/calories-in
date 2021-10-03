import { chakra } from '@chakra-ui/react'
import { Plus, Trash2, Copy } from 'react-feather'
import { MenuItem } from 'general'

const PlusStyled = chakra(Plus)
const Trash2Styled = chakra(Trash2)
const CopyStyled = chakra(Copy)

type Params = {
  onRemove: () => void
  onAddIngredient: () => void
  onClone: () => void
}

function getMenuItems({ onRemove, onAddIngredient, onClone }: Params) {
  return [
    <MenuItem key="addFoods" onClick={onAddIngredient}>
      <PlusStyled pointerEvents="none" size={20} mr={3} />
      Add foods
    </MenuItem>,
    <MenuItem key="duplicateMeal" onClick={onClone}>
      <CopyStyled pointerEvents="none" size={20} mr={3} />
      Duplicate meal
    </MenuItem>,
    <MenuItem key="remove" onClick={onRemove}>
      <Trash2Styled pointerEvents="none" size={20} mr={3} />
      Remove meal
    </MenuItem>,
  ]
}

export default getMenuItems
