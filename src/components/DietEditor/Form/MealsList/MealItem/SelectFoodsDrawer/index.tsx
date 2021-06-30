import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import { Food } from 'core/types'
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  onSave: (foods: Food[]) => void
  mealName?: string
}

function SelectFoodsDrawer({ onClose, isOpen, onSave, mealName }: Props) {
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
        onSave={onSave}
        onClose={onClose}
        mealName={mealName}
        searchInputRef={searchInputRef}
      />
    </Drawer>
  )
}

export default SelectFoodsDrawer
