import { Flex, Button, chakra } from '@chakra-ui/react'
//import { DietForm } from 'core/dietForm'
//import { useFormContext } from 'react-hook-form'
// import { v4 as uuidv4 } from 'uuid'
import { Plus, Save } from 'react-feather'
import UndoRedoButtons from './UndoRedoButtons'
import UtilityButtons from './UtilityButtons'
import MenuButtons from './MenuButtons'

const PlusStyled = chakra(Plus)
const SaveStyled = chakra(Save)

type Props = {
  onMealAdd: () => void
  onSave: () => void
}

function Controls({ onMealAdd, onSave }: Props) {
  /*
    const { getValues, reset } = useFormContext<DietForm>()

  function onRearrange() {
    const form = getValues()
    const { mealsForms } = form

    const newMealsForms = []

    for (let i = mealsForms.length - 1; i >= 0; i--) {
      const mealForm = { ...mealsForms[i], fieldId: uuidv4() }
      newMealsForms.push(mealForm)
    }

    const newForm = {
      ...form,
      mealsForms: newMealsForms,
    }

    reset(newForm)
  }*/

  return (
    <Flex width="100%" pt={3} alignItems="center">
      <Flex flex="4" justifyContent="space-between">
        <UndoRedoButtons />
        <UtilityButtons />
      </Flex>

      <Flex flex="6" justifyContent="flex-end">
        <Button
          leftIcon={<SaveStyled color="gray.400" pointerEvents="none" />}
          variant="outline"
          mr={1}
          onClick={onSave}
        >
          Save
        </Button>
        <Button
          leftIcon={<PlusStyled color="white" pointerEvents="none" />}
          mr={1}
          variant="solid"
          onClick={onMealAdd}
        >
          Add Meal
        </Button>

        <MenuButtons />
      </Flex>
    </Flex>
  )
}

export default Controls
