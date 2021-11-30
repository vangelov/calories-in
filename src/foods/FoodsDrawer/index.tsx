import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import { Food } from 'foods'
import { MealForm } from 'meals'
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  mealName?: string
  mealForm?: MealForm
  canSelect?: boolean
  onSelectedFoods?: (foods: Food[], mealName?: string) => void
}

function FoodsDrawer({
  onClose,
  isOpen,
  mealName,
  mealForm,
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
        mealForm={mealForm}
        onSelectedFoods={onSelectedFoods}
        searchInputRef={searchInputRef}
        canSelect={canSelect}
      />
    </Drawer>
  )
}

export default FoodsDrawer
