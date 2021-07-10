import { Input, Flex } from '@chakra-ui/react'
import { getIngredientsFormsPath, IngredientField } from 'core/diets'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import { Draggable } from 'react-beautiful-dnd'
import { useFormChangesStoreMethods } from 'general/undoRedo'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FoodInfo } from 'components/foods'
import { FoodAmountInput } from 'components/foods'
import StatsLayout from 'components/stats/StatsLayout'
import Stat from 'components/stats/Stat'
import RightAligned from 'components/general/RightAligned'
import Menu from './Menu'
import { useFoodsStoreState } from 'core/foods'
import { getIngredientStats } from 'core/stats'
import { useOneTimeCheckStoreMethods } from 'general/oneTimeCheck'
import { getInsertIngredientFormAnimationKey } from 'core/diets'
import { useScreenSize } from 'components/general/ScreenSizeProvider'

type Props = {
  variantIndex: number
  mealIndex: number
  index: number
  ingredientField: IngredientField

  onRemove: (index: number) => void
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
  variantIndex,
  mealIndex,
  index,
  ingredientField,
  onRemove,
}: Props) {
  const { register, control } = useFormContext()
  const { saveLastChange } = useFormChangesStoreMethods()
  const [isVisible, setIsVisible] = useState(true)
  const amountName = getIngredientsFormsPath(
    variantIndex,
    mealIndex,
    index,
    'amountInGrams'
  )
  const amountInGrams = useWatch({ name: amountName })
  const oneTimeCheck = useOneTimeCheckStoreMethods()
  const screenSize = useScreenSize()
  const amountInputSize = screenSize >= 2 ? 'sm' : 'md'

  function onAmountChange() {
    saveLastChange()
  }

  function onAnimationComplete() {
    if (!isVisible) {
      onRemove(index)
    }
  }

  if (!ingredientField.foodId || !ingredientField.fieldId) {
    throw new Error('Food id is missing')
  }

  const pendingAnimationForInserted = oneTimeCheck.checkAndReset(
    getInsertIngredientFormAnimationKey(ingredientField.fieldId)
  )

  const { getFoodById } = useFoodsStoreState()
  const food = getFoodById(ingredientField.foodId)
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
            bg={snapshot.isDragging ? 'white' : undefined}
            alignItems="center"
            position="relative"
            py={2}
            _hover={{ backgroundColor: 'gray.50' }}
          >
            <Input
              fontSize="md"
              type="hidden"
              {...register(
                getIngredientsFormsPath(
                  variantIndex,
                  mealIndex,
                  index,
                  'fieldId'
                )
              )}
              defaultValue={ingredientField.fieldId}
            />

            <Controller
              render={() => <div />}
              name={getIngredientsFormsPath(
                variantIndex,
                mealIndex,
                index,
                'foodId'
              )}
              control={control}
              defaultValue={ingredientField.foodId}
            />

            <StatsLayout
              prefersAmount={true}
              nameElement={
                <FoodInfo
                  ml={3}
                  fontSize={{ base: 'sm', md: 'md' }}
                  food={food}
                />
              }
              amountElement={
                <RightAligned>
                  <FoodAmountInput
                    size={amountInputSize}
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
              menuElement={<Menu mr={3} onRemove={() => setIsVisible(false)} />}
            />
          </Flex>
        </motion.div>
      )}
    </Draggable>
  )
}

export default IngredientItem
