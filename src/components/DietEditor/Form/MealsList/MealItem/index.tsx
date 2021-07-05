import {
  getMealsFormsPath,
  MealField,
  MealsFieldArray,
  useIngredientsFieldArray,
  useRemoveIngredientForm,
} from 'core/diets'
import { Flex, LayoutProps, SpaceProps, Input } from '@chakra-ui/react'
import IngredientsList from './IngredientsList'
import Header from './Header'
import { useFormContext } from 'react-hook-form'
import { RefObject, useState } from 'react'
import SelectFoodsDrawer from './SelectFoodsDrawer'
import { motion } from 'framer-motion'
import { useOneTimeCheckStoreMethods } from 'general/oneTimeCheck'
import { getInsertMealFormAnimationKey } from 'core/diets'
import { Draggable } from 'react-beautiful-dnd'
import { useReorderIngredientsForms } from 'core/diets'
import useAddIngredients from './useAddIngredients'
import IngredientsStatsStoreProvider from 'core/stats/IngredientsStatsStoreProvider'

type Props = {
  mealField: MealField
  index: number
  variantIndex: number
  onRemove: (index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
  onFirstAppear: () => void
  mealsFieldArray: MealsFieldArray
} & LayoutProps &
  SpaceProps

const variants = {
  open: {
    opacity: 1,
  },
  hidden: { opacity: 0 },
  collapsed: { opacity: 0, height: 0, x: 0 },
}

function MealItem({
  mealField,
  index,
  onRemove,
  getMealNameInputRefById,
  variantIndex,
  onFirstAppear,
  mealsFieldArray,
  ...rest
}: Props) {
  const ingredientsFieldArray = useIngredientsFieldArray({
    mealIndex: index,
    variantIndex,
  })
  const removeIngredientForm = useRemoveIngredientForm({
    ingredientsFieldArray,
  })
  const addIngredients = useAddIngredients({
    index,
    variantIndex,
    ingredientsFieldArray,
    mealsFieldArray,
  })

  const { register } = useFormContext()
  const [isVisible, setIsVisible] = useState(true)
  const oneTimeCheck = useOneTimeCheckStoreMethods()

  useReorderIngredientsForms({ mealField, ingredientsFieldArray })

  function onAnimationComplete() {
    if (pendingAnimationForInserted) {
      onFirstAppear()
    } else if (!isVisible) {
      onRemove(index)
    }
  }

  if (!mealField.fieldId) {
    throw new Error('Meal id is missing')
  }

  const pendingAnimationForInserted = oneTimeCheck.checkAndReset(
    getInsertMealFormAnimationKey(mealField.fieldId)
  )

  return (
    <Draggable
      key={mealField.fieldId}
      draggableId={mealField.fieldId as string}
      index={index}
    >
      {(provided, snapshot) => (
        <motion.div
          transition={{
            ease: 'easeInOut',
            duration: pendingAnimationForInserted ? 0.12 : undefined,
          }}
          style={{
            opacity: pendingAnimationForInserted ? 0 : 1,
          }}
          initial={pendingAnimationForInserted ? 'hidden' : false}
          animate={isVisible ? 'open' : 'collapsed'}
          onAnimationComplete={onAnimationComplete}
          variants={variants}
        >
          <Flex
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={provided.draggableProps.style}
            flexDirection="column"
            borderRadius={10}
            borderWidth="1px"
            mb={3}
            backgroundColor="white"
            boxShadow={snapshot.isDragging ? 'lg' : undefined}
            {...rest}
          >
            <Input
              type="hidden"
              {...register(getMealsFormsPath(variantIndex, index, 'fieldId'))}
              defaultValue={mealField.fieldId}
            />
            <IngredientsStatsStoreProvider
              mealField={mealField}
              variantIndex={variantIndex}
              mealIndex={index}
            >
              <Header
                {...provided.dragHandleProps}
                variantIndex={variantIndex}
                getMealNameInputRefById={getMealNameInputRefById}
                index={index}
                mealField={mealField}
                onRemove={() => setIsVisible(false)}
                onAddIngredient={addIngredients.onAdd}
              />
            </IngredientsStatsStoreProvider>

            <IngredientsList
              mealField={mealField}
              mealIndex={index}
              variantIndex={variantIndex}
              ingredientsFields={ingredientsFieldArray.ingredientsFields}
              onIngredientRemove={removeIngredientForm.onRemove}
              onAddIngredients={addIngredients.onAdd}
            />

            <SelectFoodsDrawer {...addIngredients.selectFoodsDrawerProps} />
          </Flex>
        </motion.div>
      )}
    </Draggable>
  )
}

export default MealItem
