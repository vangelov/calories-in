import {
  DietForm,
  getIngredientForm,
  getMealsFormsPath,
  IngredientForm,
  MealField,
} from 'core/dietForm'
import {
  Flex,
  LayoutProps,
  SpaceProps,
  Input,
  useDisclosure,
} from '@chakra-ui/react'
import IngredientsList from './IngredientsList'
import useIngredientsController from './useIngredientsController'
import Header from './Header'
import { useFormContext } from 'react-hook-form'
import { RefObject, useState } from 'react'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'
import SelectOrCreateFoodsDrawer from './SelectOrCreateFoodsDrawer'
import { useFoodsByIdDispatch } from 'core/foods'
import { useUndoRedoMethods } from 'core/undoRedo'
import { Food } from 'core/types'

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
  const { getValues } = useFormContext<DietForm>()
  const ingredientsFormsController = useIngredientsController(index, mealField)
  const addAddIngredientDisclosure = useDisclosure()
  const foodsByIdDispatch = useFoodsByIdDispatch()
  const { saveLastChange } = useUndoRedoMethods()
  const [mealName, setMealName] = useState<string | undefined>()

  const { register } = useFormContext()
  const oneTimeCheck = useOneTimeCheck()

  function onSave(foods: Food[]) {
    addAddIngredientDisclosure.onClose()

    const ingredientForms: IngredientForm[] = []

    for (const food of foods) {
      foodsByIdDispatch({ type: 'addFood', food })

      const ingredientForm = getIngredientForm({
        foodId: food.id,
        amountInGrams: 100,
      })

      oneTimeCheck.set(`${ingredientForm.fieldId}test`)
      ingredientForms.push(ingredientForm)
    }

    ingredientsFormsController.insertIngredientForm(
      ingredientsFormsController.ingredientsFields.length,
      ingredientForms
    )

    saveLastChange()
  }

  function onAddIngredient() {
    const dietForm = getValues()
    const mealForm = dietForm.mealsForms[index]

    setMealName(mealForm.name)
    addAddIngredientDisclosure.onOpen()
  }

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
        onAddIngredient={onAddIngredient}
      />

      <IngredientsList
        mealField={mealField}
        mealIndex={index}
        ingredientsFields={ingredientsFormsController.ingredientsFields}
        onIngredientRemove={ingredientsFormsController.onIngredientRemove}
      />

      <SelectOrCreateFoodsDrawer
        mealName={mealName}
        isOpen={addAddIngredientDisclosure.isOpen}
        onClose={addAddIngredientDisclosure.onClose}
        onSave={onSave}
      />
    </Flex>
  )
}

export default MealItem
