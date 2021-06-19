import { BoxProps, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { MealField, getMealsFormsPath } from 'core/dietForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { RefObject } from 'react'
import { useMergeRefs } from '@chakra-ui/react'

type Props = {
  variantIndex: number
  mealField: MealField
  index: number
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
} & BoxProps

function Name({
  variantIndex,
  mealField,
  index,
  getMealNameInputRefById,
  ...rest
}: Props) {
  const { register } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const nameRegister = register(getMealsFormsPath(variantIndex, index, 'name'))

  const nameInputRef = useMergeRefs(
    nameRegister.ref,
    getMealNameInputRefById(mealField.fieldId as string)
  )

  function onNameChange(event: any) {
    nameRegister.onChange(event)
    saveLastChange()
  }

  return (
    <Input
      {...nameRegister}
      ref={nameInputRef}
      placeholder="Enter meal name"
      onChange={onNameChange}
      autoComplete="off"
      bg="white"
      textColor="gray.600"
      width="85%"
      fontSize="md"
      fontWeight="medium"
      size="md"
      defaultValue={mealField.name}
      {...rest}
    />
  )
}

export default Name
