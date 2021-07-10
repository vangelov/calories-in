import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  mealName?: string
}

function SelectFoodsDrawer({ onClose, isOpen, mealName }: Props) {
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
        searchInputRef={searchInputRef}
      />
    </Drawer>
  )
}

export default SelectFoodsDrawer
