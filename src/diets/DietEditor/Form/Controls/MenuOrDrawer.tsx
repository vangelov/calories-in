import { chakra } from '@chakra-ui/react'
import { FilePlus, Download, List, Menu } from 'react-feather'
import {
  MenuOrDrawer as MenuOrDrawerBase,
  MenuOrDrawerItem,
  MenuOrDrawerSeparator,
  ScreenSize,
  useScreenSize,
} from 'general'

const DownloadStyled = chakra(Download)
const ListStyled = chakra(List)
const FilePlusStyled = chakra(FilePlus)

type Props = {
  onImport: () => void
  onClear: () => void
  onViewFoods: () => void
}

function MenuOrDrawer({ onImport, onClear, onViewFoods }: Props) {
  const screenSize = useScreenSize()

  return (
    <MenuOrDrawerBase
      title="Meal plan"
      variant="outline"
      mr={2}
      size={screenSize < ScreenSize.Medium ? 'md' : 'sm'}
      icon={<Menu size={20} />}
      aria-label="Meal plan actions"
    >
      <MenuOrDrawerItem icon={<FilePlusStyled />} onClick={onClear}>
        Create new
      </MenuOrDrawerItem>
      <MenuOrDrawerSeparator />
      <MenuOrDrawerItem icon={<DownloadStyled />} onClick={onImport}>
        Import
      </MenuOrDrawerItem>
      <MenuOrDrawerItem icon={<ListStyled />} onClick={onViewFoods}>
        View foods
      </MenuOrDrawerItem>
    </MenuOrDrawerBase>
  )
}

export default MenuOrDrawer
