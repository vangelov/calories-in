import { getMealsFormsPath, MealField } from 'core/dietForm'
import { Flex, LayoutProps, SpaceProps, Input } from '@chakra-ui/react'
import IngredientsList from './IngredientsList'
import useIngredientsController from './useIngredientsController'
import Header from './Header'
import { useFormContext } from 'react-hook-form'
import { ForwardedRef, forwardRef } from 'react'

type Props = {
  mealField: MealField
  index: number
  forwardRef?: ForwardedRef<HTMLDivElement>
  onRemove: (index: number) => void
} & LayoutProps &
  SpaceProps

function MealItem({ mealField, index, onRemove, forwardRef, ...rest }: Props) {
  const ingredientsFormsController = useIngredientsController(index, mealField)

  const { register } = useFormContext()

  return (
    <Flex
      ref={forwardRef}
      flexDirection="column"
      backgroundColor="white"
      {...rest}
    >
      <Input
        type="hidden"
        {...register(getMealsFormsPath(index, 'fieldId'))}
        defaultValue={mealField.fieldId}
      />
      <Header
        zIndex={1}
        index={index}
        mealIndex={index}
        mealField={mealField}
        ingredientsFields={ingredientsFormsController.ingredientsFields}
        onRemove={onRemove}
      />

      <IngredientsList
        mealField={mealField}
        mealIndex={index}
        ingredientsFields={ingredientsFormsController.ingredientsFields}
        ingredientsStats={[]}
        onIngredientRemove={ingredientsFormsController.onIngredientRemove}
      />
    </Flex>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <MealItem forwardRef={ref} {...props} />
))
