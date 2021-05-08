import { getMealsFormsPath, MealField } from 'core/dietForm'
import { Flex, LayoutProps, SpaceProps, Input } from '@chakra-ui/react'
import IngredientsList from './IngredientsList'
import useIngredientsController from './useIngredientsController'
import Header from './Header'
import { useFormContext } from 'react-hook-form'
import { RefObject } from 'react'

type Props = {
  mealField: MealField
  index: number
  onRemove: (index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
} & LayoutProps &
  SpaceProps

function MealItem({
  mealField,
  index,
  onRemove,
  getMealNameInputRefById,
  ...rest
}: Props) {
  const ingredientsFormsController = useIngredientsController(index, mealField)

  const { register } = useFormContext()

  return (
    <Flex flexDirection="column" backgroundColor="white" {...rest}>
      <Input
        type="hidden"
        {...register(getMealsFormsPath(index, 'fieldId'))}
        defaultValue={mealField.fieldId}
      />
      <Header
        getMealNameInputRefById={getMealNameInputRefById}
        zIndex={2}
        index={index}
        mealField={mealField}
        onRemove={onRemove}
      />

      <IngredientsList
        mealField={mealField}
        mealIndex={index}
        ingredientsFields={ingredientsFormsController.ingredientsFields}
        onIngredientRemove={ingredientsFormsController.onIngredientRemove}
      />
    </Flex>
  )
}

export default MealItem
