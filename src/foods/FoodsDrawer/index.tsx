import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import { Food } from 'foods'
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  mealName?: string
  canSelect?: boolean
  onSelectedFoods?: (foods: Food[], mealName?: string) => void
}

function FoodsDrawer({
  onClose,
  isOpen,
  mealName,
  canSelect = true,
  onSelectedFoods,
}: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  return (
    <Drawer
      initialFocusRef={isMobile ? undefined : searchInputRef}
      isOpen={isOpen}
      size="md"
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay />
      <Content
        onClose={onClose}
        mealName={mealName}
        onSelectedFoods={onSelectedFoods}
        searchInputRef={searchInputRef}
        canSelect={canSelect}
      />
    </Drawer>
  )
}

export default FoodsDrawer
