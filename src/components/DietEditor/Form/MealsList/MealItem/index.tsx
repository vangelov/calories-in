import {
  DietForm,
  getMealsFormsPath,
  MealField,
  useIngredientsFieldArray,
} from 'core/dietForm'
import {
  Flex,
  LayoutProps,
  SpaceProps,
  Input,
  useDisclosure,
} from '@chakra-ui/react'
import IngredientsList from './IngredientsList'
import Header from './Header'
import { useFormContext } from 'react-hook-form'
import { RefObject, useState } from 'react'
import SelectOrCreateFoodsDrawer from './SelectOrCreateFoodsDrawer'
import { Food } from 'core/types'
import { useAddIngredients } from 'core/dietForm'

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
  const ingredientsFieldArray = useIngredientsFieldArray(index, mealField)
  const addAddIngredientDisclosure = useDisclosure()
  const [mealName, setMealName] = useState<string | undefined>()
  const addIngredients = useAddIngredients({ ingredientsFieldArray })
  const { register } = useFormContext()

  function onSave(foods: Food[]) {
    addAddIngredientDisclosure.onClose()
    addIngredients.onAddIngredients(foods)
  }

  function onAddIngredient() {
    const dietForm = getValues()
    const mealForm = dietForm.mealsForms[index]
    setMealName(mealForm.name)

    addAddIngredientDisclosure.onOpen()
  }

  return (
    <Flex
      flexDirection="column"
      borderRadius={10}
      borderWidth="1px"
      mb={3}
      backgroundColor="white"
      {...rest}
    >
      <Input
        type="hidden"
        {...register(getMealsFormsPath(index, 'fieldId'))}
        defaultValue={mealField.fieldId}
      />
      <Header
        getMealNameInputRefById={getMealNameInputRefById}
        index={index}
        mealField={mealField}
        onRemove={onRemove}
        onAddIngredient={onAddIngredient}
      />

      <IngredientsList
        mealField={mealField}
        mealIndex={index}
        ingredientsFields={ingredientsFieldArray.ingredientsFields}
        onIngredientRemove={ingredientsFieldArray.onIngredientRemove}
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
