import { IngredientForm } from 'ingredients'
import { Draggable } from 'react-beautiful-dnd'
import { memo } from 'react'
import { ContextMenuFlex } from 'general'
import { Text, Divider } from '@chakra-ui/react'

type Props = {
  variantIndex: number
  mealIndex: number
  index: number
  ingredientForm: IngredientForm

  shouldAddRadiusToLastBottomBorder: boolean
  isLast: boolean
}

function HeaderItem({
  variantIndex,
  mealIndex,
  index,
  ingredientForm,

  shouldAddRadiusToLastBottomBorder,
  isLast,
}: Props) {
  // console.log('ingredient', variantIndex, mealIndex, index)

  return (
    <Draggable
      key={ingredientForm.fieldId}
      draggableId={ingredientForm.fieldId as string}
      index={index}
    >
      {(provided, snapshot) => (
        <ContextMenuFlex
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          boxShadow={
            snapshot.isDragging
              ? 'rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px'
              : undefined
          }
          bg={snapshot.isDragging ? 'gray.50' : undefined}
          alignItems="center"
          position="relative"
          p={3}
          _hover={{ backgroundColor: 'gray.50' }}
          borderBottomRadius={
            isLast && shouldAddRadiusToLastBottomBorder ? 10 : 0
          }
          overflow="hidden"
        >
          <Text
            fontSize="md"
            mr={3}
            textColor="gray.600"
            flexShrink={0}
            fontWeight="medium"
          >
            For the sauce
          </Text>
          <Divider />
        </ContextMenuFlex>
      )}
    </Draggable>
  )
}

export default memo(HeaderItem)
