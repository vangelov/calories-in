import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import { MealForm } from 'meals'
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  onSelectMeal: (meal: MealForm) => void
}

function MealsDrawer({ onClose, isOpen, onSelectMeal }: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  return (
    <Drawer
      initialFocusRef={isMobile ? undefined : searchInputRef}
      isOpen={isOpen}
      size="sm"
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay />
      <Content
        onClose={onClose}
        onSelectMeal={onSelectMeal}
        searchInputRef={searchInputRef}
      />
    </Drawer>
  )
}

export default MealsDrawer
