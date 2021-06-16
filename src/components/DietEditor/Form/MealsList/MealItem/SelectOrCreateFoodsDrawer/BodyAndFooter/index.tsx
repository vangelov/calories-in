import {
  DrawerBody,
  DrawerFooter,
  Button,
  Flex,
  VStack,
} from '@chakra-ui/react'
import { FoodsList } from 'components/foods'
import { Food } from 'core/types'
import useSelection from 'core/utils/useSelection'
import SelectedFoodsList from './SelectedFoodsList'
import ActionTypeOptions, { ActionType } from './ActionTypeOptions'
import { RefObject, useState } from 'react'
import { CreateOrEditFoodFields } from 'components/foods'
import { getFoodForm, useFoodForm, useSubmitFoodForm } from 'core/foodForm'
import { FormProvider } from 'react-hook-form'

type Props = {
  onClose: () => void
  searchInputRef: RefObject<HTMLInputElement>
  onSave: (foods: Food[]) => void
}

function BodyAndFooter({ onClose, onSave, searchInputRef }: Props) {
  const selection = useSelection<Food>()
  const [actionType, setActionType] = useState<ActionType>('selectFoods')
  const formMethods = useFoodForm(getFoodForm())

  const submitFoodForm = useSubmitFoodForm({
    formMethods,
    onComplete: (food: Food) => onSave([food]),
  })

  function onSaveButtonClick() {
    if (actionType === 'selectFoods') {
      onSave(selection.selectedItems)
    } else {
      submitFoodForm.onSubmit()
    }
  }

  return (
    <>
      <DrawerBody>
        <Flex width="100%" height="100%" flexDirection="column">
          <ActionTypeOptions
            actionType={actionType}
            onActionTypeChange={setActionType}
          />

          {actionType === 'selectFoods' ? (
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
          ) : (
            <FormProvider {...formMethods}>
              <CreateOrEditFoodFields flex={1} />
            </FormProvider>
          )}
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
    </>
  )
}

export default BodyAndFooter
