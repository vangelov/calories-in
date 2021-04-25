import {
  Input,
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { getIngredientsFormsPath, IngredientField } from 'core/dietForm'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import { Stats } from 'core/stats'
import { Draggable } from 'react-beautiful-dnd'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useFoodsByIdState } from 'core/foods/FoodsByIdProvider'
import { motion } from 'framer-motion'
import { useState } from 'react'

type Props = {
  mealIndex: number
  index: number
  ingredientField: IngredientField
  ingredientStats: Stats
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
  ingredientStats,

  onRemove,
}: Props) {
  const { register, control } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const foodsByIdState = useFoodsByIdState()
  const [isVisible, setIsVisible] = useState(true)
  const amountName = getIngredientsFormsPath(mealIndex, index, 'amountInGrams')
  const amountRegister = register(amountName)
  const amountInGrams = useWatch({ name: amountName })

  const onAmountChange = (event: any) => {
    amountRegister.onChange(event)
    saveLastChange()
  }

  if (!ingredientField.foodId) {
    throw new Error('Food id is missing')
  }

  const food = foodsByIdState[ingredientField.foodId]

  return (
    <Draggable
      key={ingredientField.fieldId}
      draggableId={ingredientField.fieldId as string}
      index={index}
    >
      {(provided, snapshot) => (
        <motion.div
          initial={false}
          animate={isVisible ? 'open' : 'collapsed'}
          onAnimationComplete={() => !isVisible && onRemove(index)}
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
          >
            <Text>{food.name}</Text>

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
              autoComplete="off"
              bg="white"
              {...amountRegister}
              onChange={onAmountChange}
              defaultValue={ingredientField.amountInGrams}
            />
            <Text width="50px">{amountInGrams * 2}</Text>

            <Menu isLazy={true} eventListeners={false} placement="right">
              <MenuButton as={Button}>Actions</MenuButton>
              <MenuList>
                <MenuItem onClick={() => setIsVisible(false)}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </motion.div>
      )}
    </Draggable>
  )
}

export default IngredientItem
