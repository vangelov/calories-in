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
import { Food } from 'core/types'
import { RefObject } from 'react'
import { FoodsList } from 'components/foods'
import useSelection from 'general/useSelection'
import SelectedFoodsList from './SelectedFoodsList'
import FoodModal from 'components/foods/FoodModal'
import useFoodActions from 'components/foods/useFoodActions'
import Header from './Header'
import { useIngredientsFormsStoreMethods } from 'core/diets'

type Props = {
  onClose: () => void
  mealName?: string
  searchInputRef: RefObject<HTMLInputElement>
}

function Content({ onClose, mealName, searchInputRef }: Props) {
  const selection = useSelection<Food>()
  const foodActions = useFoodActions()
  const ingredientsFormsStoreMethods = useIngredientsFormsStoreMethods()

  function onSaveButtonClick() {
    ingredientsFormsStoreMethods.addIngredientsForms(selection.selectedItems)
    onClose()
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
            <Button
              variant="link"
              colorScheme="teal"
              onClick={foodActions.onCreate}
            >
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
              searchInputRef={searchInputRef}
              selection={selection}
              flex={1}
              onFoodPreview={foodActions.onPreview}
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

      <FoodModal {...foodActions.foodModalProps} />
    </DrawerContent>
  )
}

export default Content
