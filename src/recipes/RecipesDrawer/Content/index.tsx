import {
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  VStack,
  HStack,
  DrawerHeader,
  Button,
} from '@chakra-ui/react'
import { RefObject } from 'react'
import { Recipe } from 'recipes'
import RecipesList from './RecipesList'

type Props = {
  onClose: () => void
  searchInputRef: RefObject<HTMLInputElement>
  onRecipeSelect: (recipe: Recipe) => void
}

function Content({ onClose, onRecipeSelect, searchInputRef }: Props) {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Select Meal</DrawerHeader>

      <DrawerBody overflow="hidden">
        <VStack width="100%" height="100%" spacing={6} alignItems="stretch">
          <RecipesList
            onRecipeSelect={onRecipeSelect}
            searchInputRef={searchInputRef}
            flex={1}
          />
        </VStack>
      </DrawerBody>

      <DrawerFooter>
        <HStack spacing={3}>
          <Button variant="solid" onClick={onClose}>
            Close
          </Button>
        </HStack>
      </DrawerFooter>
    </DrawerContent>
  )
}

export default Content
