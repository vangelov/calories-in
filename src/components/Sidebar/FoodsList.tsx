import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Box } from '@chakra-ui/react'
import styled from 'styled-components'
import React from 'react'

const ITEMS = [
  { id: '1', content: 'a' },
  { id: '2', content: 'b' },
  { id: '3', content: 'c' },
  { id: '4', content: 'd' },
]

const Clone = styled(Box)`
  ~ div {
    transform: none !important;
  }
`

function FoodsList() {
  return (
    <Droppable droppableId="ITEMS" isDropDisabled={true}>
      {(provided, snapshot) => (
        <Box ref={provided.innerRef}>
          {ITEMS.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
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
                    {item.content}
                  </Box>

                  {snapshot.isDragging && (
                    <Clone bg="white" padding={2}>
                      {item.content}
                    </Clone>
                  )}
                </React.Fragment>
              )}
            </Draggable>
          ))}
        </Box>
      )}
    </Droppable>
  )
}

export default FoodsList
