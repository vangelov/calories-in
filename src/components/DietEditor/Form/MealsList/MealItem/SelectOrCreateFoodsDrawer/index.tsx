import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
} from '@chakra-ui/react'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import FoodsList from 'components/general/FoodsList'
import { useFoodsListState } from 'core/foods'
import { Food } from 'core/types'
import useSelection from 'core/utils/useSelection'

type Props = {
  onClose: () => void
  isOpen: boolean
  onSave: (foods: Food[]) => void
}

function SelectOrCreateFoodsDrawer({ onClose, isOpen, onSave }: Props) {
  const selection = useSelection()
  const foods = useFoodsListState()

  function onSaveButtonClick() {
    const selectedFoods: Food[] = foods.filter(food =>
      selection.isIdSelected(food.id)
    )

    selection.reset()
    onSave(selectedFoods)
  }

  function onBeforeClose() {
    selection.reset()
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} size="md" placement="right" onClose={onBeforeClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add foods</DrawerHeader>

        <DrawerBody>
          <Flex width="100%" height="100%" flexDirection="column">
            <RadioGroup value="1">
              <Stack direction="row" spacing={5}>
                <Radio colorScheme="custom" size="lg" value="1">
                  Select Foods
                </Radio>
                <Radio colorScheme="custom" value="2" size="lg">
                  Create Food
                </Radio>
              </Stack>
            </RadioGroup>

            <FoodsList selection={selection} />
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" size="lg" mr={3} onClick={onBeforeClose}>
            Cancel
          </Button>
          <Button size="lg" onClick={onSaveButtonClick}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default SelectOrCreateFoodsDrawer
