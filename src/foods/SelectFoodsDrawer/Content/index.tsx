import {
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Flex,
  Button,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react'
import { RefObject, useRef } from 'react'
import { FoodsList, FoodsListMethods, FoodModal } from 'foods'
import useSelection, { Item } from 'general/useSelection'
import SelectedFoodsList from './SelectedFoodsList'
import Header from './Header'
import useActions from './useActions'
import MenuButtons from './MenuButtons'
import {
  useImportFoods,
  FoodsListModal,
  useFoodsListModalDisclosure,
} from 'foods/persistence'

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

  const foodsListModalDisclosure = useFoodsListModalDisclosure()
  const importFoods = useImportFoods({ foodsListModalDisclosure })

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

          <FoodsList
            ref={listRef}
            searchInputRef={searchInputRef}
            selection={selection}
            flex={1}
            onFoodPreview={actions.onPreviewFood}
          />
        </VStack>
      </DrawerBody>

      <DrawerFooter justifyContent="space-between">
        <MenuButtons
          onImport={importFoods.onImport}
          onExport={foodsListModalDisclosure.onOpen}
        />

        <HStack spacing={3}>
          <Button variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button size="md" colorScheme="teal" onClick={actions.onSave}>
            Add
          </Button>
        </HStack>
      </DrawerFooter>

      <FoodModal
        isOpen={actions.foodModalDisclosure.isOpen}
        onClose={actions.foodModalDisclosure.onClose}
        onFoodCreatedOrUpdated={actions.onFoodCreatedOrUpdated}
        food={actions.food}
      />

      <FoodsListModal
        isOpen={foodsListModalDisclosure.isOpen}
        onClose={foodsListModalDisclosure.onClose}
        foodsToImport={foodsListModalDisclosure.foodsToImport}
      />
    </DrawerContent>
  )
}

export default Content
