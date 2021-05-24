import { getIngredientForm, getMealsFormsPath, MealField } from 'core/dietForm'
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
import { RefObject } from 'react'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'
import AddIngredientDrawer from './AddIngredientDrawer'
import { useFoodsByIdDispatch, useFoodsListState } from 'core/foods'
import { useUndoRedoMethods } from 'core/undoRedo'

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
  const addAddIngredientDisclosure = useDisclosure()
  const foodsByIdDispatch = useFoodsByIdDispatch()
  const foodsListState = useFoodsListState()
  const { saveLastChange } = useUndoRedoMethods()

  const { register } = useFormContext()
  const oneTimeCheck = useOneTimeCheck()

  function onSave() {
    addAddIngredientDisclosure.onClose()

    const food = foodsListState[0]

    foodsByIdDispatch({ type: 'addFood', food })

    const ingredientForm = getIngredientForm({
      foodId: 1,
      amountInGrams: 100,
    })

    oneTimeCheck.set(`${ingredientForm.fieldId}test`)

    ingredientsFormsController.insertIngredientForm(
      ingredientsFormsController.ingredientsFields.length,
      ingredientForm
    )

    saveLastChange()
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
        onAddIngredient={addAddIngredientDisclosure.onOpen}
      />

      <IngredientsList
        mealField={mealField}
        mealIndex={index}
        ingredientsFields={ingredientsFormsController.ingredientsFields}
        onIngredientRemove={ingredientsFormsController.onIngredientRemove}
      />

      <AddIngredientDrawer
        isOpen={addAddIngredientDisclosure.isOpen}
        onClose={addAddIngredientDisclosure.onClose}
        onSave={onSave}
      />
    </Flex>
  )
}

export default MealItem
