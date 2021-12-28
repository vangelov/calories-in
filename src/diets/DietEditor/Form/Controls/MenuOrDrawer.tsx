import { chakra } from '@chakra-ui/react'
import { Download, List, MoreHorizontal, Trash } from 'react-feather'
import {
  MenuOrDrawer as MenuOrDrawerBase,
  MenuOrDrawerItem,
  MenuOrDrawerSeparator,
  ScreenSize,
  useScreenSize,
} from 'general'

const DownloadStyled = chakra(Download)
const ListStyled = chakra(List)
const TrashStyled = chakra(Trash)

type Props = {
  onImport: () => void
  onClear: () => void
  onViewFoods: () => void
}

function MenuOrDrawer({ onImport, onClear, onViewFoods }: Props) {
  const screenSize = useScreenSize()

  const items = [
    <MenuOrDrawerSeparator key="separator" />,
    <MenuOrDrawerItem
      key="importMealPlan"
      icon={<DownloadStyled />}
      onClick={onImport}
    >
      Import meal plan
    </MenuOrDrawerItem>,
    <MenuOrDrawerItem
      key="manageFoods"
      icon={<ListStyled />}
      onClick={onViewFoods}
    >
      Manage foods
    </MenuOrDrawerItem>,
  ]

  if (screenSize <= ScreenSize.Small) {
    items.unshift(
      <MenuOrDrawerItem
        key="clearMealPlan"
        icon={<TrashStyled />}
        onClick={onClear}
      >
        Clear
      </MenuOrDrawerItem>
    )
  }

  return (
    <MenuOrDrawerBase
      size="md"
      title="More actions"
      variant="solid"
      mr={2}
      icon={<MoreHorizontal size={20} />}
      aria-label="More actions"
    >
      {items}
    </MenuOrDrawerBase>
  )
}

export default MenuOrDrawer
