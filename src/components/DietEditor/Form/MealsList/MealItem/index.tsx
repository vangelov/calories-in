import { getMealsFormsPath, MealField } from 'core/dietForm'
import { Flex, LayoutProps, SpaceProps, Input } from '@chakra-ui/react'
import IngredientsList from './IngredientsList'
import { useMealStats, useUpdateMealStats } from 'core/stats'
import useIngredientsController from './useIngredientsController'
import Header from './Header'
import { useFormContext } from 'react-hook-form'

type Props = {
  mealField: MealField
  index: number

  onRemove: (index: number) => void
} & LayoutProps &
  SpaceProps

function MealItem({ mealField, index, onRemove, ...rest }: Props) {
  const ingredientsFormsController = useIngredientsController(index, mealField)
  const { mealStats, ingredientsStats } = useMealStats(
    index,
    mealField,
    ingredientsFormsController.ingredientsFields
  )

  const { register } = useFormContext()

  useUpdateMealStats(index, mealStats)

  console.log(
    's',
    ingredientsStats,
    ingredientsFormsController.ingredientsFields
  )

  return (
    <Flex flexDirection="column" backgroundColor="gray" {...rest}>
      <Input
        type="hidden"
        name={getMealsFormsPath(index, 'fieldId')}
        ref={node => register(node)}
        defaultValue={mealField.fieldId}
      />
      <Header
        zIndex={1}
        mealIndex={index}
        mealField={mealField}
        onRemove={onRemove}
      />

      <IngredientsList
        mealField={mealField}
        mealIndex={index}
        ingredientsFields={ingredientsFormsController.ingredientsFields}
        ingredientsStats={ingredientsStats}
        onIngredientRemove={ingredientsFormsController.onIngredientRemove}
      />
    </Flex>
  )
}

export default MealItem
