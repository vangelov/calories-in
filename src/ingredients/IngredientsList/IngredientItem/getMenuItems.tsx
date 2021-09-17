import { chakra } from '@chakra-ui/react'
import { MenuItem } from 'general'
import { Trash2, Info } from 'react-feather'

const InfoStyled = chakra(Info)
const Trash2Styled = chakra(Trash2)

type Props = {
  onRemove: () => void
}

function getMenuItems({ onRemove }: Props) {
  return [
    <MenuItem key="remove" onClick={onRemove}>
      <Trash2Styled pointerEvents="none" size={20} mr={3} />
      Remove
    </MenuItem>,
    <MenuItem key="viewDetails" onClick={() => {}}>
      <InfoStyled pointerEvents="none" size={20} mr={3} />
      View details
    </MenuItem>,
  ]
}

export default getMenuItems
