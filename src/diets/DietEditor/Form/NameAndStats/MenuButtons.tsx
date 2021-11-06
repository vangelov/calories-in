import { chakra } from '@chakra-ui/react'
import { MoreHorizontal, FilePlus, Download, List, Info } from 'react-feather'
import { Menu, MenuItem, ResponsiveIconButton } from 'general'

const DownloadStyled = chakra(Download)
const ListStyled = chakra(List)
const FilePlusStyled = chakra(FilePlus)
const MoreHorizontalStyled = chakra(MoreHorizontal)
const InfoStyled = chakra(Info)

type Props = {
  onImport: () => void
  onClear: () => void
  onViewFoods: () => void
  onVariantDetails: () => void
}

function MenuButtons({
  onImport,
  onClear,
  onViewFoods,
  onVariantDetails,
}: Props) {
  return (
    <Menu
      arrow
      align="end"
      viewScroll="close"
      menuButton={
        <ResponsiveIconButton
          aria-label="Meal plan actions"
          icon={<MoreHorizontalStyled size={20} pointerEvents="none" />}
          variant="outline"
        />
      }
    >
      <MenuItem onClick={onVariantDetails}>
        <InfoStyled pointerEvents="none" mr={3} />
        View variant details
      </MenuItem>
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
