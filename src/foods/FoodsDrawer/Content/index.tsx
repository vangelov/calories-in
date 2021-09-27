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
  useDisclosure,
} from '@chakra-ui/react'
import { RefObject, useRef, useState } from 'react'
import { FoodsList, FoodsListMethods, FoodModal } from 'foods'
import useSelection, { Item } from 'general/useSelection'
import SelectedFoodsList from './SelectedFoodsList'
import Header from './Header'
import MenuButtons from './MenuButtons'
import { useImportFoods, FoodsListModal } from 'foods/persistence'
import { FoodsFilterStoreProvider } from 'foods-filters'
import { loadFoodsFilter } from 'foods-filters/persistence'
import useFoodEvents from './useFoodEvents'
import useAddFoods from './useAddFoods'

type Props = {
  onClose: () => void
  mealName?: string
  searchInputRef: RefObject<HTMLInputElement>
  variantFormIndex?: number
  mealFormIndex?: number
  canSelect: boolean
}

function Content({
  onClose,
  mealName,
  searchInputRef,
  variantFormIndex,
  mealFormIndex,
  canSelect,
}: Props) {
  const selection = useSelection<Item>()
  const listRef = useRef<FoodsListMethods>(null)
  const addFoods = useAddFoods({
    selection,
    variantFormIndex,
    mealFormIndex,
    onClose,
  })
  const foodEvents = useFoodEvents({ listRef })

  const foodsListModalDisclosure = useDisclosure()
  const importFoods = useImportFoods({ foodsListModalDisclosure })
  const [foodsFilter] = useState(loadFoodsFilter)

  return (
    <DrawerContent>
      <DrawerCloseButton />
      <Header mealName={mealName} canSelect={canSelect} />

      <DrawerBody overflow="hidden">
        <VStack width="100%" height="100%" spacing={3} alignItems="stretch">
          <Flex>
            <Text textColor="gray.500" size="lg" mr={1}>
              Foods missing?
            </Text>
            <Button
              variant="link"
              colorScheme="teal"
              onClick={foodEvents.onCreateFood}
            >
              Create new food
            </Button>
          </Flex>

          {canSelect && <SelectedFoodsList selection={selection} />}

          <FoodsFilterStoreProvider initialFilter={foodsFilter}>
            <FoodsList
              ref={listRef}
              searchInputRef={searchInputRef}
              selection={selection}
              flex={1}
              onFoodPreview={foodEvents.onPreviewFood}
              itemUsageType={canSelect ? 'selectOrPreview' : 'previewOnly'}
            />
          </FoodsFilterStoreProvider>
        </VStack>
      </DrawerBody>

      <DrawerFooter justifyContent="space-between">
        <MenuButtons
          onImport={importFoods.onImport}
          onExport={foodsListModalDisclosure.onOpen}
        />

        <HStack spacing={3}>
          <Button variant="outline" size="md" onClick={onClose}>
            Close
          </Button>
          {canSelect && (
            <Button size="md" colorScheme="teal" onClick={addFoods.onAdd}>
              Add
            </Button>
          )}
        </HStack>
      </DrawerFooter>

      <FoodModal
        isOpen={foodEvents.foodModalDisclosure.isOpen}
        onClose={foodEvents.foodModalDisclosure.onClose}
        onFoodCreatedOrUpdated={foodEvents.onFoodCreatedOrUpdated}
        food={foodEvents.food}
      />

      <FoodsListModal
        isOpen={foodsListModalDisclosure.isOpen}
        onClose={foodsListModalDisclosure.onClose}
        foodsToImport={importFoods.foodsToImport}
      />
    </DrawerContent>
  )
}

export default Content
