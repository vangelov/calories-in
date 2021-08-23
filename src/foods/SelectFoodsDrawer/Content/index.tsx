import {
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Flex,
  Button,
  VStack,
  Text,
} from '@chakra-ui/react'
import { RefObject, useRef } from 'react'
import { FoodsList, FoodsListMethods, FoodModal } from 'foods'
import useSelection, { Item } from 'general/useSelection'
import SelectedFoodsList from './SelectedFoodsList'
import Header from './Header'
import useActions from './useActions'
import { FoodsFilterStoreProvider } from 'foods-filters'

type Props = {
  onClose: () => void
  mealName?: string
  searchInputRef: RefObject<HTMLInputElement>
  variantFormIndex: number
  mealFormIndex: number
}

function Content({
  onClose,
  mealName,
  searchInputRef,
  variantFormIndex,
  mealFormIndex,
}: Props) {
  const selection = useSelection<Item>()
  const listRef = useRef<FoodsListMethods>(null)
  const actions = useActions({
    selection,
    listRef,
    variantFormIndex,
    mealFormIndex,
    onClose,
  })

  return (
    <DrawerContent>
      <DrawerCloseButton />
      <Header mealName={mealName} />

      <DrawerBody overflow="hidden">
        <VStack width="100%" height="100%" spacing={3} alignItems="stretch">
          <Flex>
            <Text textColor="gray.500" size="lg" mr={1}>
              Foods missing?
            </Text>
            <Button
              variant="link"
              colorScheme="teal"
              onClick={actions.onCreateFood}
            >
              Create new food
            </Button>
          </Flex>

          <SelectedFoodsList selection={selection} />

          <FoodsFilterStoreProvider>
            <FoodsList
              ref={listRef}
              searchInputRef={searchInputRef}
              selection={selection}
              flex={1}
              onFoodPreview={actions.onPreviewFood}
            />
          </FoodsFilterStoreProvider>
        </VStack>
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" size="md" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button size="md" colorScheme="teal" onClick={actions.onSave}>
          Add
        </Button>
      </DrawerFooter>

      <FoodModal
        isOpen={actions.foodModalDisclosure.isOpen}
        onClose={actions.foodModalDisclosure.onClose}
        onFoodCreatedOrUpdated={actions.onFoodCreatedOrUpdated}
        food={actions.food}
      />
    </DrawerContent>
  )
}

export default Content
