import { chakra } from '@chakra-ui/react'
import { FilePlus, Download, List, MoreHorizontal } from 'react-feather'
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
      size="md"
      title="Meal plan"
      variant="solid"
      mr={2}
      width={screenSize >= ScreenSize.Medium ? '60px' : undefined}
      icon={<MoreHorizontal size={20} />}
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
        Manage foods
      </MenuOrDrawerItem>
    </MenuOrDrawerBase>
  )
}

export default MenuOrDrawer
