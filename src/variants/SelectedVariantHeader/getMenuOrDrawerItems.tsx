import { MenuOrDrawerSeparator, MenuOrDrawerItem } from 'general'
import { Info, Trash2, Copy, Plus } from 'react-feather'
import { chakra } from '@chakra-ui/react'

const Trash2Styled = chakra(Trash2)
const CopyStyled = chakra(Copy)
const InfoStyled = chakra(Info)
const PlusStyled = chakra(Plus)

type Params = {
  onAddMeal: () => void
  onDetails: () => void
  onCopy: () => void
  onRemove: () => void
  canRemove: boolean
}

function getMenuOrDrawerItems({
  onAddMeal,
  onDetails,
  onCopy,
  onRemove,
  canRemove,
}: Params) {
  return [
    <MenuOrDrawerItem
      icon={<PlusStyled pointerEvents="none" />}
      onClick={onAddMeal}
    >
      Add meal
    </MenuOrDrawerItem>,

    <MenuOrDrawerItem
      icon={<InfoStyled pointerEvents="none" />}
      onClick={onDetails}
    >
      View details
    </MenuOrDrawerItem>,
    <MenuOrDrawerSeparator key="divider" />,
    <MenuOrDrawerItem icon={<CopyStyled />} onClick={onCopy}>
      Duplicate
    </MenuOrDrawerItem>,
    <MenuOrDrawerItem
      key="remove"
      icon={<Trash2Styled />}
      isDisabled={!canRemove}
      onClick={onRemove}
    >
      Remove
    </MenuOrDrawerItem>,
  ]
}

export default getMenuOrDrawerItems
