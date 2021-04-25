import { Flex, Button } from '@chakra-ui/react'
import { DietForm } from 'core/dietForm'
import { useUndoRedoMethods, useUndoRedoState } from 'core/undoRedo'
import { useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  onMealAdd: () => void
  onSave: () => void
}

function Controls({ onMealAdd, onSave }: Props) {
  const { getValues, reset } = useFormContext<DietForm>()
  const { undo, redo } = useUndoRedoMethods()
  const { canUndo, canRedo } = useUndoRedoState()

  function onUndo() {
    undo()
  }

  function onRedo() {
    redo()
  }

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
  }

  return (
    <Flex
      padding={2}
      height="40px"
      width="100%"
      alignItems="center"
      backgroundColor="brown"
    >
      <Button onClick={onMealAdd}>Add Meal</Button>
      <Button onClick={onSave}>Save</Button>
      <Button onClick={onRearrange}>Rearrange meals</Button>
      <Button isDisabled={!canUndo} onClick={onUndo}>
        Undo
      </Button>
      <Button isDisabled={!canRedo} onClick={onRedo}>
        Redo
      </Button>
    </Flex>
  )
}

export default Controls
