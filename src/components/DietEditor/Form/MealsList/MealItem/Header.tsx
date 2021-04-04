import { Input, Button, Flex } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { MealField, getMealsFormsPath } from 'core/dietForm'
import { useRef } from 'react'
import { useUndoRedoMethods } from 'core/undoRedo'

type Props = {
  mealIndex: number
  mealField: MealField
  zIndex: number
  onRemove: (mealIndex: number) => void
}

function Header({ mealIndex, mealField, onRemove, zIndex }: Props) {
  const { register } = useFormContext()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { saveLastChange } = useUndoRedoMethods()

  const onMealNameChange = () => {
    saveLastChange()
  }

  return (
    <Flex
      position="sticky"
      top="0px"
      bg="rgba(0, 0, 255, 0.88)"
      padding={2}
      zIndex={zIndex}
      justifyContent="space-between"
    >
      <Input
        name={getMealsFormsPath(mealIndex, 'name')}
        bg="white"
        width="30%"
        ref={node => {
          register(node)
          inputRef.current = node
        }}
        onChange={onMealNameChange}
        defaultValue={mealField.name}
      />
      <Button onClick={() => onRemove(mealIndex)}>Remove</Button>
    </Flex>
  )
}

export default Header
