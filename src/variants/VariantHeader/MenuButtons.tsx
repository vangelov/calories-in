import { chakra, IconButton } from '@chakra-ui/react'
import { MoreHorizontal, Info } from 'react-feather'
import { Menu, MenuItem } from 'general'

const MoreHorizontalStyled = chakra(MoreHorizontal)
const InfoStyled = chakra(Info)

type Props = {
  onVariantDetails: () => void
}

function MenuButtons({ onVariantDetails }: Props) {
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
      <MenuItem onClick={onVariantDetails}>
        <InfoStyled pointerEvents="none" size={16} mr={3} />
        View variant details
      </MenuItem>
    </Menu>
  )
}

export default MenuButtons
