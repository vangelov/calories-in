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
import { motion } from 'framer-motion'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'
import getInsertMealAnimationKey from 'core/dietForm/getInsertMealAnimationKey'

type Props = {
  mealField: MealField
  index: number
  onRemove: (index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
} & LayoutProps &
  SpaceProps

const variants = {
  open: {
    opacity: 1,
    height: 'auto',
    x: 0,
  },
  collapsed: { opacity: 0, height: 0, x: 0 },
}

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
  const [isVisible, setIsVisible] = useState(true)
  const oneTimeCheck = useOneTimeCheck()

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

  function onAnimationComplete() {
    if (!isVisible) {
      onRemove(index)
    }
  }

  if (!mealField.fieldId) {
    throw new Error('Meal id is missing')
  }

  const pendingAnimationForInserted = oneTimeCheck.checkAndReset(
    getInsertMealAnimationKey(mealField.fieldId)
  )

  return (
    <motion.div
      transition={{ ease: 'easeInOut' }}
      style={{
        opacity: pendingAnimationForInserted ? 0 : 1,
      }}
      initial={pendingAnimationForInserted ? 'collapsed' : false}
      animate={isVisible ? 'open' : 'collapsed'}
      onAnimationComplete={onAnimationComplete}
      variants={variants}
    >
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
          onRemove={() => setIsVisible(false)}
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
    </motion.div>
  )
}

export default MealItem
