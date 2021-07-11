import {
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Flex,
  Button,
  VStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Food } from 'core/types'
import { RefObject, useState, useRef } from 'react'
import FoodsList, { FoodsListMethods } from 'components/foods/FoodsList'
import useSelection from 'general/useSelection'
import SelectedFoodsList from './SelectedFoodsList'
import FoodModal from 'components/foods/FoodModal'
import Header from './Header'
import { useIngredientsFormsStoreMethods } from 'core/diets'
import { useFoodsFilterStoreState } from 'core/foods'

type Props = {
  onClose: () => void
  mealName?: string
  searchInputRef: RefObject<HTMLInputElement>
}

function Content({ onClose, mealName, searchInputRef }: Props) {
  const selection = useSelection<Food>()
  const foodModalDisclosure = useDisclosure()
  const [food, setFood] = useState<Food>()
  const [canEdit, setCanEdit] = useState(false)
  const ingredientsFormsStoreMethods = useIngredientsFormsStoreMethods()
  const listRef = useRef<FoodsListMethods>(null)
  const initialFilter = useFoodsFilterStoreState()

  console.log('render')

  function onSaveButtonClick() {
    ingredientsFormsStoreMethods.addIngredientsForms(selection.selectedItems)
    onClose()
  }

  function onCreateFood() {
    setFood(undefined)
    setCanEdit(true)
    foodModalDisclosure.onOpen()
  }

  function onPreviewFood(food: Food) {
    setFood(food)
    setCanEdit(false)
    foodModalDisclosure.onOpen()
  }

  function onFoodCreated(food: Food) {
    if (listRef.current) {
      listRef.current.scrollToFood(food)

      setTimeout(() => {
        selection.onToggleItem(food)
      }, 500)
    }
  }

  return (
    <DrawerContent>
      <DrawerCloseButton />
      <Header mealName={mealName} />

      <DrawerBody>
        <Flex width="100%" height="100%" flexDirection="column">
          <Flex mb={2}>
            <Text textColor="gray.500" mr={1}>
              Foods missing?
            </Text>
            <Button variant="link" colorScheme="teal" onClick={onCreateFood}>
              Create new food
            </Button>
          </Flex>

          <VStack
            flex={1}
            spacing={0}
            flexDirection="column"
            alignItems="stretch"
          >
            <SelectedFoodsList selection={selection} />

            <FoodsList
              initialFilter={initialFilter}
              ref={listRef}
              searchInputRef={searchInputRef}
              selection={selection}
              flex={1}
              onFoodPreview={onPreviewFood}
            />
          </VStack>
        </Flex>
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" size="md" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button size="md" colorScheme="teal" onClick={onSaveButtonClick}>
          Save
        </Button>
      </DrawerFooter>

      <FoodModal
        isOpen={foodModalDisclosure.isOpen}
        onClose={foodModalDisclosure.onClose}
        onFoodCreated={onFoodCreated}
        canEdit={canEdit}
        food={food}
      />
    </DrawerContent>
  )
}

export default Content
