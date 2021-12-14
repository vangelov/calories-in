import { chakra } from '@chakra-ui/react'
import { Trash2, Edit, Copy, Info } from 'react-feather'
import { MenuOrDrawerItem, MenuOrDrawerSeparator } from 'general'

const Trash2Styled = chakra(Trash2)
const EditStyled = chakra(Edit)
const CopyStyled = chakra(Copy)
const InfoStyled = chakra(Info)

type Props = {
  onClone: () => void
  onEditName: () => void
  onDelete: () => void
  onViewDetails: () => void
  canRemove: boolean
}

function getMenuOrDrawerItems({
  onClone,
  onEditName,
  canRemove,
  onDelete,
  onViewDetails,
}: Props) {
  return [
    <MenuOrDrawerItem icon={<EditStyled />} key="rename" onClick={onEditName}>
      Rename
    </MenuOrDrawerItem>,

    <MenuOrDrawerSeparator key="separator" />,

    <MenuOrDrawerItem
      icon={<InfoStyled />}
      key="viewDetails"
      onClick={onViewDetails}
    >
      View details
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
