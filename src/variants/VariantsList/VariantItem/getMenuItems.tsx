import { chakra } from '@chakra-ui/react'
import { Trash2, Edit, Copy } from 'react-feather'
import { MenuItem } from 'general'

const Trash2Styled = chakra(Trash2)
const EditStyled = chakra(Edit)
const CopyStyled = chakra(Copy)

type Props = {
  onClone: () => void
  onEditName: () => void
  onDelete: () => void
  canRemove: boolean
}

function getMenuItems({ onClone, onEditName, canRemove, onDelete }: Props) {
  return [
    <MenuItem key="copy" onClick={onClone}>
      <CopyStyled pointerEvents="none" size={20} mr={3} />
      Copy variant
    </MenuItem>,

    <MenuItem key="rename" onClick={onEditName}>
      <EditStyled pointerEvents="none" size={20} mr={3} />
      Rename variant
    </MenuItem>,

    <MenuItem key="remove" disabled={!canRemove} onClick={onDelete}>
      <Trash2Styled pointerEvents="none" size={20} mr={3} />
      Remove variant
    </MenuItem>,
  ]
}

export default getMenuItems
