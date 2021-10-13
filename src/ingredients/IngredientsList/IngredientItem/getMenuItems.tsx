import { chakra } from '@chakra-ui/react'
import { MenuItem } from 'general'
import { Trash2, Info, Edit } from 'react-feather'

const InfoStyled = chakra(Info)
const Trash2Styled = chakra(Trash2)
const EditStyled = chakra(Edit)

type Props = {
  onEditNotes: () => void
  onRemove: () => void
  onViewFoodDetails: () => void
}

function getMenuItems({ onRemove, onViewFoodDetails, onEditNotes }: Props) {
  return [
    <MenuItem key="editNotes" onClick={onEditNotes}>
      <EditStyled pointerEvents="none" size={20} mr={3} />
      Edit notes
    </MenuItem>,
    <MenuItem key="remove" onClick={onRemove}>
      <Trash2Styled pointerEvents="none" size={20} mr={3} />
      Remove food
    </MenuItem>,
    <MenuItem key="viewDetails" onClick={onViewFoodDetails}>
      <InfoStyled pointerEvents="none" size={20} mr={3} />
      View food details
    </MenuItem>,
  ]
}

export default getMenuItems
