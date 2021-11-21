import { chakra, IconButton } from '@chakra-ui/react'
import { MoreHorizontal, Info, Trash2, Copy, Plus } from 'react-feather'
import { Menu, MenuItem } from 'general'

const Trash2Styled = chakra(Trash2)
const CopyStyled = chakra(Copy)
const MoreHorizontalStyled = chakra(MoreHorizontal)
const InfoStyled = chakra(Info)
const PlusStyled = chakra(Plus)

type Props = {
  onAddMeal: () => void
  onDetails: () => void
  onCopy: () => void
  onRemove: () => void
  canRemove: boolean
}

function MenuButtons({
  onAddMeal,
  onDetails,
  canRemove,
  onCopy,
  onRemove,
}: Props) {
  return (
    <Menu
      arrow
      align="end"
      viewScroll="close"
      menuButton={
        <IconButton
          aria-label="Meal plan actions"
          icon={<MoreHorizontalStyled size={20} pointerEvents="none" />}
          variant="outline"
          size="sm"
        />
      }
    >
      <MenuItem onClick={onAddMeal}>
        <PlusStyled pointerEvents="none" size={16} mr={3} />
        Add meal
      </MenuItem>
      <MenuItem onClick={onDetails}>
        <InfoStyled pointerEvents="none" size={16} mr={3} />
        View variant details
      </MenuItem>
      <MenuItem key="copy" onClick={onCopy}>
        <CopyStyled pointerEvents="none" size={20} mr={3} />
        Duplicate variant
      </MenuItem>
      <MenuItem key="remove" disabled={!canRemove} onClick={onRemove}>
        <Trash2Styled pointerEvents="none" size={20} mr={3} />
        Remove variant
      </MenuItem>
    </Menu>
  )
}

export default MenuButtons
