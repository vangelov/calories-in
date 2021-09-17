import { chakra } from '@chakra-ui/react'
import { MoreHorizontal, Trash, Download } from 'react-feather'
import { Menu, MenuItem, ResponsiveIconButton, useScreenSize } from 'general'

const DownloadStyled = chakra(Download)
const TrashStyled = chakra(Trash)
const MoreHorizontalStyled = chakra(MoreHorizontal)

type Props = {
  onImport: () => void
  onClear: () => void
}

function MenuButtons({ onImport, onClear }: Props) {
  const screenSize = useScreenSize()
  const mr = screenSize >= 2 ? 1 : 2

  return (
    <Menu
      arrow
      align="end"
      viewScroll="close"
      menuButton={
        <ResponsiveIconButton
          mr={mr}
          aria-label="Meal plan actions"
          icon={<MoreHorizontalStyled size={20} pointerEvents="none" />}
          variant="outline"
        />
      }
    >
      <MenuItem onClick={onImport}>
        <DownloadStyled pointerEvents="none" mr={3} />
        Import
      </MenuItem>
      <MenuItem onClick={onClear}>
        <TrashStyled pointerEvents="none" mr={3} />
        Clear data
      </MenuItem>
    </Menu>
  )
}

export default MenuButtons
