import { BoxProps, Input, Flex, Image, Box } from '@chakra-ui/react'
import { useDietFormActions } from 'diets'
import { ScreenSize, useScreenSize } from 'general'
import { MealForm } from 'meals'
import { RefObject, ChangeEvent } from 'react'

type Props = {
  variantIndex: number
  mealForm: MealForm
  index: number
  getMealNameInputRefById: (id: string) => RefObject<HTMLInputElement>
} & BoxProps

function Name({
  variantIndex,
  mealForm,
  index,
  getMealNameInputRefById,
  ...rest
}: Props) {
  const { imageUrl } = mealForm
  const dietFormActions = useDietFormActions()
  const screenSize = useScreenSize()

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    dietFormActions.updateMealForm(variantIndex, index, {
      name: value,
    })
  }

  const test = imageUrl ? (
    <Image
      mr={3}
      objectFit="cover"
      borderRadius={6}
      src={mealForm.imageUrl}
      boxSize={10}
    />
  ) : (
    <Box mr={3} borderRadius={6} bg="gray.200" boxSize={10} />
  )

  return (
    <Flex ml={3} alignItems="center" height="100%" mr={4}>
      {screenSize >= ScreenSize.Medium && test}

      <Input
        ref={getMealNameInputRefById(mealForm.fieldId)}
        placeholder="Meal name"
        onChange={onNameChange}
        autoComplete="off"
        bg="white"
        width="80%"
        fontWeight="medium"
        textColor="gray.800"
        size="md"
        value={mealForm.name}
        {...rest}
      />
    </Flex>
  )
}

export default Name
