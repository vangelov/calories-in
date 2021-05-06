import { Input, Flex, IconButton, Box } from '@chakra-ui/react'
import { getIngredientsFormsPath, IngredientField } from 'core/dietForm'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import { Draggable } from 'react-beautiful-dnd'
import { useUndoRedoMethods } from 'core/undoRedo'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLastFieldIdProvider } from 'core/ingredientsDnd'
import FoodInfo from './FoodInfo'
import { FoodAmountInput } from 'components/general'
import StatsLayout from 'components/general/StatsLayout'
import StatValue from 'components/general/StatValue'
import { Menu, MenuItem } from 'components/general'
import { MoreHorizontal } from 'react-feather'
import RightAligned from 'components/general/RightAligned'

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
  const amountInGrams = useWatch({ name: amountName }) as number
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
            _hover={{ backgroundColor: 'rgb(247, 250, 252, 0.35)' }}
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
              nameElement={<FoodInfo ingredientField={ingredientField} />}
              amountElement={
                <RightAligned>
                  <FoodAmountInput
                    {...amountRegister}
                    onChange={onAmountChange}
                    defaultValue={ingredientField.amountInGrams}
                  />
                </RightAligned>
              }
              energyElement={<StatValue value={`${amountInGrams * 10}kcal`} />}
              proteinElement={<StatValue value={`${amountInGrams * 2}g`} />}
              carbsElement={<StatValue value={`${amountInGrams * 2.5}g`} />}
              fatElement={<StatValue value={`${amountInGrams * 1.5}g`} />}
              menuElement={
                <RightAligned>
                  <Menu
                    arrow
                    align="end"
                    viewScroll="close"
                    menuButton={
                      <IconButton
                        aria-label="test"
                        icon={
                          <MoreHorizontal color="gray" pointerEvents="none" />
                        }
                        variant="ghost"
                      />
                    }
                  >
                    <MenuItem onClick={() => setIsVisible(false)}>
                      Remove
                    </MenuItem>
                    <MenuItem>Cancel</MenuItem>
                  </Menu>
                </RightAligned>
              }
            />
          </Flex>
        </motion.div>
      )}
    </Draggable>
  )
}

export default IngredientItem
