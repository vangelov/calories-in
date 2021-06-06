import {
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Food } from 'core/types'
import { useRef } from 'react'
import BodyAndFooter from './BodyAndFooter'

type Props = {
  onClose: () => void
  isOpen: boolean
  onSave: (foods: Food[]) => void
  mealName?: string
}

function SelectOrCreateFoodsDrawer({
  onClose,
  isOpen,
  onSave,
  mealName,
}: Props) {
  const title = mealName ? `Add foods to ${mealName}` : 'Add foods'
  const searchInputRef = useRef<HTMLInputElement>(null)

  return (
    <Drawer
      initialFocusRef={searchInputRef}
      isOpen={isOpen}
      size="md"
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <BodyAndFooter
          searchInputRef={searchInputRef}
          onClose={onClose}
          onSave={onSave}
        />
      </DrawerContent>
    </Drawer>
  )
}

export default SelectOrCreateFoodsDrawer
