import { Input, Flex, Box } from '@chakra-ui/react'
import { transparentize } from '@chakra-ui/theme-tools'
import { getIngredientsFormsPath, IngredientField } from 'core/dietForm'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import { Draggable } from 'react-beautiful-dnd'
import { useUndoRedoMethods } from 'core/undoRedo'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLastFieldIdProvider } from 'core/ingredientsDnd'
import FoodInfo from './FoodInfo'
import { FoodAmountInput } from 'components/general'
import { StatsLayout, Stat } from 'components/general'
import RightAligned from 'components/general/RightAligned'
import Menu from './Menu'
import { useFoodsByIdState } from 'core/foods/FoodsByIdProvider'
import { numberOrZeroFromString } from 'core/utils'
import { getIngredientStats } from 'core/stats'

type Props = {
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
  mealIndex,
  index,
  ingredientField,
  onRemove,
}: Props) {
  const { register, control } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const [isVisible, setIsVisible] = useState(true)
  const amountName = getIngredientsFormsPath(mealIndex, index, 'amountInGrams')
  const amountRegister = register(amountName)
  const amountInGramsString = useWatch({ name: amountName })
  const { getAndResetLastFieldId } = useLastFieldIdProvider()

  function onAmountChange(event: any) {
    amountRegister.onChange(event)
    saveLastChange()
  }

  function onAnimationComplete() {
    if (!isVisible) {
      onRemove(index)
    }
  }

  const isLastFieldId = getAndResetLastFieldId(
    ingredientField.fieldId as string
  )

  if (!ingredientField.foodId) {
    throw new Error('Food id is missing')
  }

  const foodsByIdState = useFoodsByIdState()
  const food = foodsByIdState[ingredientField.foodId]

  const amountInGrams = numberOrZeroFromString(amountInGramsString)
  const ingredientStats = getIngredientStats(amountInGrams, food)

  return (
    <Draggable
      key={ingredientField.fieldId}
      draggableId={ingredientField.fieldId as string}
      index={index}
    >
      {(provided, snapshot) => (
        <motion.div
          style={{ opacity: isLastFieldId ? 0 : 1 }}
          initial={isLastFieldId ? undefined : false}
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
            py={4}
            px={6}
            minHeight="74px"
            _hover={{ backgroundColor: transparentize('gray.50', 0.35) }}
            _focus={{ borderWidth: 2 }}
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
              nameElement={
                <FoodInfo food={food} ingredientField={ingredientField} />
              }
              amountElement={
                <RightAligned>
                  <FoodAmountInput
                    {...amountRegister}
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
