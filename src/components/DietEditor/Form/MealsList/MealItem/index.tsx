import { getMealsFormsPath, MealField } from 'core/diets'
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
import SelectFoodsDrawer from './SelectFoodsDrawer'
import { motion } from 'framer-motion'
import { useOneTimeCheckStoreMethods } from 'general/oneTimeCheck'
import { getInsertMealFormAnimationKey } from 'core/diets'
import { Draggable } from 'react-beautiful-dnd'
import IngredientsStatsStoreProvider from 'core/stats/IngredientsStatsStoreProvider'
import {
  useMealsFormsStoreMethods,
  IngredientsFormsStoreProvider,
} from 'core/diets'

type Props = {
  mealField: MealField
  index: number
  variantIndex: number
  onRemove: (index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
  onFirstAppear: (mealField: MealField) => void
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

  ...rest
}: Props) {
  const { register } = useFormContext()
  const [isVisible, setIsVisible] = useState(true)
  const oneTimeCheck = useOneTimeCheckStoreMethods()
  const [selectedMealName, setSelectedMealName] = useState('')
  const drawerDisclosure = useDisclosure()
  const { getLatestMealFormAt } = useMealsFormsStoreMethods()

  function onAnimationComplete() {
    if (pendingAnimationForInserted) {
      onFirstAppear(mealField)
    } else if (!isVisible) {
      onRemove(index)
    }
  }

  function onAddIngredients() {
    const selectedMealForm = getLatestMealFormAt(variantIndex, index)
    setSelectedMealName(selectedMealForm.name)
    drawerDisclosure.onOpen()
  }

  const pendingAnimationForInserted = oneTimeCheck.checkAndReset(
    getInsertMealFormAnimationKey(mealField.fieldId as string)
  )

  console.log('MEAL')

  return (
    <IngredientsStatsStoreProvider
      mealField={mealField}
      variantIndex={variantIndex}
      mealIndex={index}
      isDragging={false}
    >
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

              <Header
                {...provided.dragHandleProps}
                variantIndex={variantIndex}
                getMealNameInputRefById={getMealNameInputRefById}
                index={index}
                mealField={mealField}
                onRemove={() => setIsVisible(false)}
                onAddIngredient={onAddIngredients}
              />
              <IngredientsFormsStoreProvider
                variantIndex={variantIndex}
                mealIndex={index}
                mealField={mealField}
              >
                <IngredientsList
                  mealField={mealField}
                  mealIndex={index}
                  variantIndex={variantIndex}
                  onAddIngredients={onAddIngredients}
                />

                <SelectFoodsDrawer
                  isOpen={drawerDisclosure.isOpen}
                  onClose={drawerDisclosure.onClose}
                  mealName={selectedMealName}
                />
              </IngredientsFormsStoreProvider>
            </Flex>
          </motion.div>
        )}
      </Draggable>
    </IngredientsStatsStoreProvider>
  )
}

export default MealItem
