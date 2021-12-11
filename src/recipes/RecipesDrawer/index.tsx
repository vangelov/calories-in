import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { Recipe } from 'recipes'
import Content from './Content'

type Props = {
  onClose: () => void
  isOpen: boolean
  onRecipeSelect: (recipe: Recipe) => void
}

function RecipesDrawer({ onClose, isOpen, onRecipeSelect }: Props) {
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
        onRecipeSelect={onRecipeSelect}
        searchInputRef={searchInputRef}
      />
    </Drawer>
  )
}

export default RecipesDrawer
