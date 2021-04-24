import { Draggable } from 'react-beautiful-dnd'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  BoxProps,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { Food } from 'core/types'

const FoodItemClone = styled(FoodItemInternal)`
  ~ div {
    transform: none !important;
  }
`

type Props = {
  food: Food
  index: number
  innerRef?: any
  isDragging?: boolean
} & BoxProps

function FoodItemInternal({
  food,
  innerRef,
  isDragging = false,
  ...rest
}: Props) {
  return (
    <Flex
      bg="white"
      boxShadow={isDragging ? 'dark-lg' : undefined}
      ref={innerRef}
      alignItems="center"
      {...rest}
    >
      <Text flex={1}>{food.name}</Text>

      <Menu isLazy={true} eventListeners={false} placement="right">
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

function FoodItem({ food, index }: Props) {
  return (
    <Draggable draggableId={food.id.toString()} index={index}>
      {(provided, snapshot) => (
        <React.Fragment>
          <FoodItemInternal
            food={food}
            index={index}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
          />

          {snapshot.isDragging && (
            <FoodItemClone isDragging={false} food={food} index={index} />
          )}
        </React.Fragment>
      )}
    </Draggable>
  )
}

export default FoodItem
