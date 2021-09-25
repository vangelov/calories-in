import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  mealName?: string
  variantFormIndex?: number
  mealFormIndex?: number
  canSelect?: boolean
}

function FoodsDrawer({
  onClose,
  isOpen,
  mealName,
  variantFormIndex,
  mealFormIndex,
  canSelect = true,
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
        variantFormIndex={variantFormIndex}
        mealFormIndex={mealFormIndex}
        searchInputRef={searchInputRef}
        canSelect={canSelect}
      />
    </Drawer>
  )
}

export default FoodsDrawer
