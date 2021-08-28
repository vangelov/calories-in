import { ButtonProps, chakra, IconButton } from '@chakra-ui/react'
import { MoreHorizontal } from 'react-feather'
import { Menu as MenuBase } from 'general'
import getMenuItems from './getMenuItems'

const MoreHorizontalStyled = chakra(MoreHorizontal)

type Props = {
  onClone: () => void
  onEditName: () => void
  onDelete: () => void
  canRemove: boolean
  isSelected: boolean
} & ButtonProps

function Menu({
  onDelete,
  onClone,
  onEditName,
  canRemove,
  isSelected,
  ...rest
}: Props) {
  return (
    <MenuBase
      arrow
      portal={true}
      viewScroll="close"
      menuButton={
        <IconButton
          aria-label="Variant actions"
          icon={<MoreHorizontalStyled size={20} pointerEvents="none" />}
          variant="ghost"
          {...rest}
          size="xs"
          borderRadius="full"
          _hover={{ backgroundColor: isSelected ? 'gray.200' : 'gray.100' }}
        />
      }
    >
      {getMenuItems({ onDelete, onClone, onEditName, canRemove })}
    </MenuBase>
  )
}

export default Menu
