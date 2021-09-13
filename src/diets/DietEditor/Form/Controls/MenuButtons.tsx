import { chakra } from '@chakra-ui/react'
import { MoreHorizontal, Trash, Download } from 'react-feather'
import { Menu, MenuItem, ResponsiveIconButton, useScreenSize } from 'general'

const DownloadStyled = chakra(Download)
const TrashStyled = chakra(Trash)
const MoreHorizontalStyled = chakra(MoreHorizontal)

type Props = {
  onImport: () => void
}

function MenuButtons({ onImport }: Props) {
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
      <MenuItem>
        <TrashStyled pointerEvents="none" mr={3} />
        Delete meal plan
      </MenuItem>
    </Menu>
  )
}

export default MenuButtons
