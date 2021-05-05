import { Draggable } from 'react-beautiful-dnd'
import { BoxProps, Flex, Text, Box, IconButton } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { Food } from 'core/types'
import { motion } from 'framer-motion'
import { Menu, MenuItem } from 'components/general'
import { MoreHorizontal } from 'react-feather'

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
      boxShadow={isDragging ? 'lg' : undefined}
      ref={innerRef}
      alignItems="center"
      _hover={{ backgroundColor: 'rgb(247, 250, 252, 0.5)' }}
      {...rest}
    >
      <motion.div
        key={food.id}
        initial={animateOnMount ? { opacity: 0, y: 0, height: 0 } : false}
        animate={animateOnMount ? { opacity: 1, y: 0, height: 'auto' } : false}
        exit={{
          opacity: 0,
          height: 0,
        }}
      >
        <Flex alignItems="center" width="100%" pt="8px" height="74px">
          <Flex
            bg="white"
            px={4}
            alignItems="center"
            border="solid"
            borderColor="gray.200"
            width="100%"
            borderRadius={4}
            borderWidth={1}
            height="66px"
          >
            <Text color="gray.500" fontSize="md" flex={1}>
              {food.name}
            </Text>

            <Menu
              arrow
              align="end"
              viewScroll="close"
              menuButton={
                <IconButton
                  aria-label="test"
                  icon={<MoreHorizontal color="gray" pointerEvents="none" />}
                  variant="ghost"
                />
              }
            >
              <MenuItem onClick={() => onRemove && onRemove(index)}>
                Remove
              </MenuItem>
            </Menu>
          </Flex>
        </Flex>
      </motion.div>
    </Box>
  )
}

function FoodItem({
  food,
  index,
  onRemove,
  animateOnMount,

  ...rest
}: Props) {
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
            {...rest}
          />

          {snapshot.isDragging && (
            <FoodItemClone
              isDragging={false}
              food={food}
              index={index}
              onRemove={() => {}}
              {...rest}
            />
          )}
        </React.Fragment>
      )}
    </Draggable>
  )
}

export default FoodItem
