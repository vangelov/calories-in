import { Text, Flex, LayoutProps, SpaceProps, Box } from '@chakra-ui/react'
import { VariantForm } from 'variants'
import { ForwardedRef, ReactNode } from 'react'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  children: ReactNode

  isSelected: boolean
  variantForm: VariantForm
  canRemove: boolean
  index: number
  forwardedRef?: ForwardedRef<HTMLDivElement>
} & LayoutProps &
  SpaceProps

function VariantItem({
  children,
  isSelected,

  variantForm,
  canRemove,
  index,
  forwardedRef,
  ...rest
}: Props) {
  return (
    <Draggable
      key={variantForm.fieldId}
      draggableId={variantForm.fieldId}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            bg="white"
            _hover={{ bg: 'gray.50' }}
            borderRadius={8}
            fontWeight="medium"
            borderWidth="1px"
            p={3}
            cursor="pointer"
            {...rest}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            boxShadow={
              snapshot.isDragging
                ? 'rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px'
                : undefined
            }
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Text mr={3} color="teal" fontSize="md">
                {children}
              </Text>
              <Text flexShrink={0} color="gray.500" fontSize="sm">
                {variantForm.mealsForms.length} meals
              </Text>
            </Flex>
          </Box>
        )
      }}
    </Draggable>
  )
}

export default VariantItem
