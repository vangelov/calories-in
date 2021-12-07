import { chakra } from '@chakra-ui/react'
import { Trash2, Edit, Copy } from 'react-feather'
import { MenuOrDrawerItem } from 'general'

const Trash2Styled = chakra(Trash2)
const EditStyled = chakra(Edit)
const CopyStyled = chakra(Copy)

type Props = {
  onClone: () => void
  onEditName: () => void
  onDelete: () => void
  canRemove: boolean
}

function getMenuOrDrawerItems({
  onClone,
  onEditName,
  canRemove,
  onDelete,
}: Props) {
  return [
    <MenuOrDrawerItem icon={<EditStyled />} key="rename" onClick={onEditName}>
      Rename
    </MenuOrDrawerItem>,

    <MenuOrDrawerItem key="copy" icon={<CopyStyled />} onClick={onClone}>
      Duplicate
    </MenuOrDrawerItem>,

    <MenuOrDrawerItem
      key="remove"
      isDisabled={!canRemove}
      icon={<Trash2Styled />}
      onClick={onDelete}
    >
      Remove
    </MenuOrDrawerItem>,
  ]
}

export default getMenuOrDrawerItems
