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
  chakra,
} from '@chakra-ui/react'
import { RefObject, useRef, useState } from 'react'
import { FoodsList, FoodsListMethods, FoodModal, Food } from 'foods'
import { useSelection } from 'general'
import SelectedFoodsList from './SelectedFoodsList'
import Header from './Header'
import MenuButtons from './MenuButtons'
import { useImportFoods, FoodsListModal } from 'foods/persistence'
import { FoodsFilterStoreProvider } from 'foods-filters'
import { loadFoodsFilter } from 'foods-filters/persistence'
import useFoodEvents from './useFoodEvents'
import { Info } from 'react-feather'
const InfoStyled = chakra(Info)

type Props = {
  onClose: () => void
  mealName?: string
  searchInputRef: RefObject<HTMLInputElement>
  onSelectedFoods?: (foods: Food[], mealName?: string) => void

  canSelect: boolean
}

function Content({
  onClose,
  mealName,
  searchInputRef,
  onSelectedFoods,
  canSelect,
}: Props) {
  const selection = useSelection<Food>()
  const listRef = useRef<FoodsListMethods>(null)
  const foodEvents = useFoodEvents({ listRef, selection })

  const foodsListModalDisclosure = useDisclosure()
  const importFoods = useImportFoods({ foodsListModalDisclosure })
  const [foodsFilter] = useState(loadFoodsFilter)

  function onAdd() {
    onSelectedFoods && onSelectedFoods(selection.selectedItems, mealName)
  }

  return (
    <DrawerContent>
      <DrawerCloseButton />
      <Header mealName={mealName} canSelect={canSelect} />

      <DrawerBody overflow="hidden">
        <VStack
          width="100%"
          height="100%"
          spacing={canSelect ? 3 : 6}
          alignItems="stretch"
        >
          <Flex>
            <Text textColor="gray.500" size="lg" mr={1}>
              Need more foods?
            </Text>
            <Button
              variant="link"
              colorScheme="teal"
              onClick={foodEvents.onCreateFood}
            >
              Create a new food
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

          <Flex color="gray.500" flexDirection="row" alignItems="center">
            <InfoStyled size={15} mr={1} />
            <Text fontSize="sm">
              All nutririon data is for raw/dry foods unless indicated
              otherwise.
            </Text>
          </Flex>
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
            <Button
              isDisabled={selection.selectedItems.length === 0}
              colorScheme="teal"
              onClick={onAdd}
            >
              Add foods
            </Button>
          )}
        </HStack>
      </DrawerFooter>

      <FoodModal
        isOpen={foodEvents.foodModalDisclosure.isOpen}
        onClose={foodEvents.foodModalDisclosure.onClose}
        onFoodCreatedOrUpdated={foodEvents.onFoodCreatedOrUpdated}
        onFoodDeleted={foodEvents.onFoodDeleted}
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
