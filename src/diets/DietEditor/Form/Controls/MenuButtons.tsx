import { chakra } from '@chakra-ui/react'
import { MoreHorizontal, FilePlus, Download, List } from 'react-feather'
import { Menu, MenuItem, ResponsiveIconButton } from 'general'

const DownloadStyled = chakra(Download)
const ListStyled = chakra(List)
const FilePlusStyled = chakra(FilePlus)
const MoreHorizontalStyled = chakra(MoreHorizontal)

type Props = {
  onImport: () => void
  onClear: () => void
  onViewFoods: () => void
}

function MenuButtons({ onImport, onClear, onViewFoods }: Props) {
  return (
    <Menu
      arrow
      align="end"
      viewScroll="close"
      menuButton={
        <ResponsiveIconButton
          mr={2}
          aria-label="Meal plan actions"
          icon={<MoreHorizontalStyled size={20} pointerEvents="none" />}
          variant="outline"
        />
      }
    >
      <MenuItem onClick={onClear}>
        <FilePlusStyled pointerEvents="none" mr={3} />
        New meal plan
      </MenuItem>
      <MenuItem onClick={onImport}>
        <DownloadStyled pointerEvents="none" mr={3} />
        Import meal plan
      </MenuItem>
      <MenuItem onClick={onViewFoods}>
        <ListStyled pointerEvents="none" mr={3} />
        View foods
      </MenuItem>
    </Menu>
  )
}

export default MenuButtons
