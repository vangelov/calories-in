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
  Box,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { Food } from 'core/types'
import { motion } from 'framer-motion'

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
  animateOnMount?: boolean
  onRemove?: (index: number) => void
} & BoxProps

function FoodItemInternal({
  food,
  innerRef,
  isDragging = false,
  index,
  animateOnMount = false,
  onRemove,
  ...rest
}: Props) {
  return (
    <Box
      bg="white"
      boxShadow={isDragging ? 'dark-lg' : undefined}
      ref={innerRef}
      alignItems="center"
      {...rest}
    >
      <motion.div
        key={food.id}
        initial={animateOnMount ? { opacity: 0, y: 0, height: 0 } : false}
        animate={animateOnMount ? { opacity: 1, y: 0, height: 'auto' } : false}
        exit={{
          opacity: 0,
          height: 0,
          transition: { exitDuration: 0.2 },
        }}
      >
        <Flex>
          <Text flex={1}>{food.name}</Text>

          {onRemove && (
            <Menu
              isLazy={true}
              strategy="fixed"
              eventListeners={false}
              placement="right"
            >
              <MenuButton as={Button}>Actions</MenuButton>
              <MenuList zIndex={100}>
                <MenuItem onClick={() => onRemove && onRemove(index)}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </motion.div>
    </Box>
  )
}

function FoodItem({ food, index, onRemove, animateOnMount }: Props) {
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
            onRemove={snapshot.isDragging ? undefined : onRemove}
            animateOnMount={animateOnMount}
          />

          {snapshot.isDragging && (
            <FoodItemClone
              isDragging={false}
              food={food}
              index={index}
              onRemove={() => {}}
            />
          )}
        </React.Fragment>
      )}
    </Draggable>
  )
}

export default FoodItem
