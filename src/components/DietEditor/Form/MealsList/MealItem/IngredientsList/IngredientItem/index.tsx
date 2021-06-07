import { Input, Flex, Box } from '@chakra-ui/react'
import { transparentize } from '@chakra-ui/theme-tools'
import { getIngredientsFormsPath, IngredientField } from 'core/dietForm'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import { Draggable } from 'react-beautiful-dnd'
import { useUndoRedoMethods } from 'core/undoRedo'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FoodInfo } from 'components/foods'
import { FoodAmountInput } from 'components/foods'
import { StatsLayout, Stat } from 'components/general'
import RightAligned from 'components/general/RightAligned'
import Menu from './Menu'
import { useFoodsByIdState } from 'core/foods'
import { getIngredientStats } from 'core/stats'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'
import { getInsertIngredientAnimationKey } from 'core/dietForm'

type Props = {
  mealIndex: number
  index: number
  ingredientField: IngredientField

  onRemove: (index: number, mealIndex: number) => void
}

const variants = {
  open: {
    opacity: 1,
    height: 'auto',
    x: 0,
  },
  collapsed: { opacity: 0, height: 0, x: 0 },
}

function IngredientItem({
  mealIndex,
  index,
  ingredientField,
  onRemove,
}: Props) {
  const { register, control } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const [isVisible, setIsVisible] = useState(true)
  const amountName = getIngredientsFormsPath(mealIndex, index, 'amountInGrams')
  const amountInGrams = useWatch({ name: amountName })
  const oneTimeCheck = useOneTimeCheck()

  function onAmountChange() {
    saveLastChange()
  }

  function onAnimationComplete() {
    if (!isVisible) {
      onRemove(index, mealIndex)
    }
  }

  if (!ingredientField.foodId || !ingredientField.fieldId) {
    throw new Error('Food id is missing')
  }

  const pendingAnimationForInserted = oneTimeCheck.checkAndReset(
    getInsertIngredientAnimationKey(ingredientField.fieldId)
  )

  const foodsByIdState = useFoodsByIdState()
  const food = foodsByIdState[ingredientField.foodId]
  const ingredientStats = getIngredientStats(amountInGrams, food)

  return (
    <Draggable
      key={ingredientField.fieldId}
      draggableId={ingredientField.fieldId as string}
      index={index}
    >
      {(provided, snapshot) => (
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
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            boxShadow={snapshot.isDragging ? 'lg' : undefined}
            bg="white"
            alignItems="center"
            position="relative"
            p={3}
            _hover={{ backgroundColor: transparentize('gray.50', 0.35) }}
          >
            {!snapshot.isDragging && (
              <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                bg="gray.200"
                height="px"
              />
            )}
            <Input
              fontSize="md"
              type="hidden"
              {...register(
                getIngredientsFormsPath(mealIndex, index, 'fieldId')
              )}
              defaultValue={ingredientField.fieldId}
            />

            <Controller
              render={() => <div />}
              name={getIngredientsFormsPath(mealIndex, index, 'foodId')}
              control={control}
              defaultValue={ingredientField.foodId}
            />

            <StatsLayout
              nameElement={<FoodInfo ml={3} food={food} />}
              amountElement={
                <RightAligned>
                  <FoodAmountInput
                    name={amountName}
                    onChange={onAmountChange}
                    defaultValue={ingredientField.amountInGrams}
                  />
                </RightAligned>
              }
              energyElement={
                <Stat type="ingredientEnergy" value={ingredientStats.energy} />
              }
              proteinElement={
                <Stat type="ingredient" value={ingredientStats.protein} />
              }
              carbsElement={
                <Stat type="ingredient" value={ingredientStats.carbs} />
              }
              fatElement={
                <Stat type="ingredient" value={ingredientStats.fat} />
              }
              menuElement={<Menu onRemove={() => setIsVisible(false)} />}
            />
          </Flex>
        </motion.div>
      )}
    </Draggable>
  )
}

export default IngredientItem
