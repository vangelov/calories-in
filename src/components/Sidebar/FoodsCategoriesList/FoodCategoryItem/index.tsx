import { Food, FoodCategory } from 'core/types'
import { Box, Text } from '@chakra-ui/react'
import FoodItem from './FoodItem'
import { Droppable } from 'react-beautiful-dnd'
import { getFoodCategoryDroppableId } from 'core/foods'
import { AnimatePresence } from 'framer-motion'
import { useFoodsListDispatch } from 'core/foods/FoodsListProvider'
import useIsFirstRender from 'core/utils/useIsFirstRender'
import { forwardRef, ForwardedRef } from 'react'

type Props = {
  foods: Food[]
  foodCategory: FoodCategory
  indexOffset: number
  forwardRef?: ForwardedRef<HTMLDivElement>
}

function FoodCategoryItem({
  foods,
  foodCategory,
  indexOffset,
  forwardRef,
}: Props) {
  const isFirstRender = useIsFirstRender()
  const foodsListDispatch = useFoodsListDispatch()

  const onFoodItemRemove = (index: number) => {
    foodsListDispatch({ type: 'removeFood', index })
  }

  return (
    <Box ref={forwardRef} marginRight={5} marginLeft={5}>
      <Box zIndex={1} backgroundColor="yellow" position="sticky" top="0">
        <Text>{foodCategory.name}</Text>
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
                  key={food.id}
                  food={food}
                  onRemove={onFoodItemRemove}
                  index={indexOffset + index}
                  animateOnMount={!isFirstRender}
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
