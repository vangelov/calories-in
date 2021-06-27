import {
  Drawer,
  DrawerOverlay,
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
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { FoodsList } from 'components/foods'
import useSelection from 'general/useSelection'
import SelectedFoodsList from './SelectedFoodsList'
import FoodModal from 'components/foods/FoodModal'
import useFoodActions from 'components/foods/useFoodActions'
import Header from './Header'

type Props = {
  onClose: () => void
  isOpen: boolean
  onSave: (foods: Food[]) => void
  mealName?: string
}

function SelectFoodsDrawer({ onClose, isOpen, onSave, mealName }: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const selection = useSelection<Food>()
  const foodActions = useFoodActions()

  function onSaveButtonClick() {
    onSave(selection.selectedItems)
  }

  return (
    <Drawer
      initialFocusRef={isMobile ? undefined : searchInputRef}
      isOpen={isOpen}
      size="md"
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay />
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
    </Drawer>
  )
}

export default SelectFoodsDrawer
