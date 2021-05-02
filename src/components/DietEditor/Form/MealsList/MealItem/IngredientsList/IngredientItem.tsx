import { Input, Flex, Text } from '@chakra-ui/react'
import { getIngredientsFormsPath, IngredientField } from 'core/dietForm'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import { Draggable } from 'react-beautiful-dnd'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useFoodsByIdState } from 'core/foods/FoodsByIdProvider'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Menu, MenuItem, MenuButton } from 'components/general'
import { useLastFieldIdProvider } from 'core/foodsDnd/LastFieldIdProvider'

type Props = {
  mealIndex: number
  index: number
  ingredientField: IngredientField

  isLast: boolean
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

  isLast,
  onRemove,
}: Props) {
  const { register, control } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const foodsByIdState = useFoodsByIdState()
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

  if (!ingredientField.foodId) {
    throw new Error('Food id is missing')
  }

  const food = foodsByIdState[ingredientField.foodId]
  const isLastFieldId = getAndResetLastFieldId(
    ingredientField.fieldId as string
  )

  console.log('test', isLastFieldId)

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
            justifyContent="space-between"
            boxShadow={snapshot.isDragging ? 'dark-lg' : undefined}
            bg="gray"
            alignItems="center"
            p={3}
            borderBottomWidth={isLast || snapshot.isDragging ? 0 : 1}
            borderBottomColor="red.700"
          >
            <Text fontSize="lg">{food.name}</Text>

            <Input
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

            <Input
              css={{ 'z-index': '0 !important' }}
              width="100px"
              height={12}
              autoComplete="off"
              bg="white"
              {...amountRegister}
              onChange={onAmountChange}
              defaultValue={ingredientField.amountInGrams}
            />
            <Text width="50px">{amountInGrams * 2}</Text>

            <Menu
              arrow
              viewScroll="close"
              menuButton={<MenuButton>Open menu</MenuButton>}
            >
              <MenuItem onClick={() => setIsVisible(false)}>Remove</MenuItem>
              <MenuItem>Cancel</MenuItem>
            </Menu>
          </Flex>
        </motion.div>
      )}
    </Draggable>
  )
}

export default IngredientItem
