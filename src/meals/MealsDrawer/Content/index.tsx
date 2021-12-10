import {
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Button,
  VStack,
  HStack,
  DrawerHeader,
} from '@chakra-ui/react'
import { RefObject, useRef } from 'react'
import { FoodsListMethods } from 'foods'
import { MealForm } from 'meals'
import MealsList from './MealsList'

type Props = {
  onClose: () => void
  searchInputRef: RefObject<HTMLInputElement>
  onSelectMeal: (meal: MealForm) => void
}

function Content({
  onClose,

  searchInputRef,
}: Props) {
  const listRef = useRef<FoodsListMethods>(null)

  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Select Meal</DrawerHeader>

      <DrawerBody overflow="hidden">
        <VStack width="100%" height="100%" spacing={6} alignItems="stretch">
          <MealsList ref={listRef} searchInputRef={searchInputRef} flex={1} />
        </VStack>
      </DrawerBody>

      <DrawerFooter>
        <HStack spacing={3}>
          <Button variant="solid" size="md" onClick={onClose}>
            Close
          </Button>
        </HStack>
      </DrawerFooter>
    </DrawerContent>
  )
}

export default Content
