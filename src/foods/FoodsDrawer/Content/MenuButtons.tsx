import { chakra, IconButton } from '@chakra-ui/react'
import { MoreHorizontal, Download, Share } from 'react-feather'
import { Menu, MenuItem } from 'general'

const DownloadStyled = chakra(Download)
const ShareStyled = chakra(Share)
const MoreHorizontalStyled = chakra(MoreHorizontal)

type Props = {
  onImport: () => void
  onExport: () => void
}

function MenuButtons({ onImport, onExport }: Props) {
  return (
    <Menu
      arrow
      align="end"
      viewScroll="close"
      menuButton={
        <IconButton
          aria-label="Foods actions"
          icon={<MoreHorizontalStyled size={20} pointerEvents="none" />}
          variant="outline"
        />
      }
    >
      <MenuItem onClick={onImport}>
        <DownloadStyled pointerEvents="none" mr={3} />
        Import custom foods
      </MenuItem>
      <MenuItem onClick={onExport}>
        <ShareStyled pointerEvents="none" mr={3} />
        Export custom foods
      </MenuItem>
    </Menu>
  )
}

export default MenuButtons
