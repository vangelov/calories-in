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
  VStack,
} from '@chakra-ui/react'
import FoodsList from 'components/general/FoodsList'
import { useUserFoodsState } from 'core/foods'
import { Food } from 'core/types'
import useSelection from 'core/utils/useSelection'
import SelectedFoodsList from './SelectedFoodsList'
import ActionTypeOptions, { ActionType } from './ActionTypeOptions'
import { useRef, useState } from 'react'
import CreateOrEditFood from 'components/foods/CreateOrEditFood'
import { getFoodForm, useFoodForm } from 'core/foodForm/foodForm'
import { FormProvider } from 'react-hook-form'

type Props = {
  onClose: () => void
  isOpen: boolean
  onSave: (foods: Food[]) => void
  mealName?: string
}

function SelectOrCreateFoodsDrawer({
  onClose,
  isOpen,
  onSave,
  mealName,
}: Props) {
  const selection = useSelection<Food>()
  const foods = useUserFoodsState()
  const title = mealName ? `Add foods to ${mealName}` : 'Add foods'
  const [actionType, setActionType] = useState<ActionType>('selectFoods')
  const formMethods = useFoodForm(getFoodForm())
  const { handleSubmit } = formMethods
  const searchInputRef = useRef<HTMLInputElement>(null)

  const onSubmit = handleSubmit(form => {
    console.log('f', form)
  })

  function onSaveButtonClick() {
    if (actionType === 'selectFoods') {
      const selectedFoods: Food[] = foods.filter(food =>
        selection.isIdSelected(food.id)
      )

      selection.reset()
      onSave(selectedFoods)
    } else {
      onSubmit()
    }
  }

  function onBeforeClose() {
    selection.reset()
    onClose()
  }

  return (
    <Drawer
      initialFocusRef={searchInputRef}
      isOpen={isOpen}
      size="md"
      placement="right"
      onClose={onBeforeClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>

        <DrawerBody>
          <Flex width="100%" height="100%" flexDirection="column">
            <ActionTypeOptions
              actionType={actionType}
              onActionChange={setActionType}
            />

            {actionType === 'selectFoods' ? (
              <VStack
                flex={1}
                mt={3}
                spacing={3}
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
            ) : (
              <FormProvider {...formMethods}>
                <CreateOrEditFood flex={1} />
              </FormProvider>
            )}
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
