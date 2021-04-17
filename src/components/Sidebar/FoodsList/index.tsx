import { Droppable } from 'react-beautiful-dnd'
import { Box, FlexProps } from '@chakra-ui/react'
import { useFoodsListState } from 'core/foods/FoodsListProvider'
import FoodItem from './FoodItem'

type Props = FlexProps

const FOODS_LIST_DROPPABLE_ID = 'FOODS_LIST'

function FoodsList({ ...rest }: Props) {
  const foodsListState = useFoodsListState()

  return (
    <Droppable droppableId={FOODS_LIST_DROPPABLE_ID} isDropDisabled={true}>
      {provided => (
        <Box ref={provided.innerRef} overflow="scroll" {...rest}>
          {foodsListState.map((food, index) => (
            <FoodItem food={food} index={index} />
          ))}
        </Box>
      )}
    </Droppable>
  )
}

export { FOODS_LIST_DROPPABLE_ID }

export default FoodsList
