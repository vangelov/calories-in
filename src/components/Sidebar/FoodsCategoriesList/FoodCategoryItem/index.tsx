import { Food, FoodCategory } from 'core/types'
import { Box, Text } from '@chakra-ui/react'
import FoodItem from './FoodItem'
import { Droppable } from 'react-beautiful-dnd'
import { getFoodCategoryDroppableId } from 'core/foods'

type Props = {
  foods: Food[]
  foodCategory: FoodCategory
  indexOffset: number
}

function FoodCategoryItem({ foods, foodCategory, indexOffset }: Props) {
  return (
    <Box>
      <Box backgroundColor="yellow" marginRight={10} position="sticky" top="0">
        <Text>{foodCategory.name}</Text>
      </Box>

      <Droppable
        droppableId={getFoodCategoryDroppableId(foodCategory)}
        isDropDisabled={true}
      >
        {provided => (
          <Box ref={provided.innerRef} paddingLeft={2} overflow="scroll">
            {foods.map((food, index) => (
              <FoodItem key={food.id} food={food} index={indexOffset + index} />
            ))}
          </Box>
        )}
      </Droppable>
    </Box>
  )
}

export default FoodCategoryItem
