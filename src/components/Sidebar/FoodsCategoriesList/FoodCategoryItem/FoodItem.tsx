import { Draggable } from 'react-beautiful-dnd'
import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { Food } from 'core/types'

const FoodItemClone = styled(Box)`
  ~ div {
    transform: none !important;
  }
`

type Props = {
  food: Food
  index: number
}

function FoodItem({ food, index }: Props) {
  return (
    <Draggable draggableId={food.id.toString()} index={index}>
      {(provided, snapshot) => (
        <React.Fragment>
          <Box
            bg="white"
            padding={2}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
          >
            {food.name}
          </Box>

          {snapshot.isDragging && (
            <FoodItemClone bg="white" padding={2}>
              {food.name}
            </FoodItemClone>
          )}
        </React.Fragment>
      )}
    </Draggable>
  )
}

export default FoodItem
