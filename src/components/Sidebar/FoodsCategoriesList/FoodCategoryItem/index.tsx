import { Food, FoodCategory } from 'core/types'
import { Box, Text } from '@chakra-ui/react'
import FoodItem from './FoodItem'
import { Droppable } from 'react-beautiful-dnd'
import { getFoodCategoryDroppableId } from 'core/foods'
import { AnimatePresence } from 'framer-motion'
import { useFoodsListDispatch } from 'core/foods/FoodsListProvider'
import { forwardRef, ForwardedRef } from 'react'

type Props = {
  foods: Food[]
  foodCategory: FoodCategory
  indexOffset: number
  forwardRef?: ForwardedRef<HTMLDivElement>
  shouldAnimateFoodsOnMount: boolean
}

function FoodCategoryItem({
  foods,
  foodCategory,
  indexOffset,
  forwardRef,
  shouldAnimateFoodsOnMount,
}: Props) {
  const foodsListDispatch = useFoodsListDispatch()

  const onFoodItemRemove = (index: number) => {
    foodsListDispatch({ type: 'removeFood', index })
  }

  return (
    <Box ref={forwardRef} mx={8}>
      <Box zIndex={1} backgroundColor="white" position="sticky" top="0">
        <Box
          p={3}
          borderRadius={4}
          backgroundColor="gray"
          position="sticky"
          top="0"
        >
          <Text fontSize="lg" fontWeight="bold">
            {foodCategory.name}
          </Text>
        </Box>
      </Box>

      <Droppable
        droppableId={getFoodCategoryDroppableId(foodCategory)}
        isDropDisabled={true}
      >
        {provided => (
          <Box ref={provided.innerRef}>
            <AnimatePresence>
              {foods.map((food, index) => (
                <FoodItem
                  mt={2}
                  mb={index === foods.length - 1 ? 2 : 0}
                  key={food.id}
                  food={food}
                  onRemove={onFoodItemRemove}
                  index={indexOffset + index}
                  animateOnMount={shouldAnimateFoodsOnMount}
                />
              ))}
            </AnimatePresence>
          </Box>
        )}
      </Droppable>
    </Box>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <FoodCategoryItem forwardRef={ref} {...props} />
))
