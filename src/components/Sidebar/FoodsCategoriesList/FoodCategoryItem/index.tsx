import { Food, FoodCategory } from 'core/types'
import { Box } from '@chakra-ui/react'
import FoodItem from './FoodItem'
import { Droppable } from 'react-beautiful-dnd'
import { getFoodCategoryDroppableId } from 'core/foodsCategories'
import { AnimatePresence } from 'framer-motion'
import { useFoodsListDispatch } from 'core/foods/FoodsListProvider'
import { forwardRef, ForwardedRef } from 'react'
import Header from './Header'

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
    <Box ref={forwardRef} mx={6}>
      <Header foodCategory={foodCategory} />

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
