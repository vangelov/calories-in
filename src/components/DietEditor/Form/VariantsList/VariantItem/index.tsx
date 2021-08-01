import { Box, Text, HStack, LayoutProps, SpaceProps } from '@chakra-ui/react'
import { VariantForm } from 'core/diets'
import { ReactNode } from 'react'
import Menu from './Menu'
import { Draggable } from 'react-beautiful-dnd'
import { memo } from 'react'
import PresenceAnimation from './PresenceAnimation'
import useActions from './useActions'

type Props = {
  children: ReactNode
  onDelete: (index: number) => void
  onClone: (index: number) => void
  onEditName: (index: number) => void
  isSelected: boolean
  onSelect: (index: number) => void
  variantForm: VariantForm
  canRemove: boolean
  index: number
  onFirstAppear?: () => void
} & LayoutProps &
  SpaceProps

function VariantItem({
  onClone,
  onEditName,
  onDelete,
  children,
  isSelected,
  onSelect,
  variantForm,
  canRemove,
  index,
  onFirstAppear,
  ...rest
}: Props) {
  const actions = useActions({
    onSelect,
    onDelete,
    variantForm,
    onFirstAppear,
    index,
  })

  return (
    <Draggable
      key={variantForm.fieldId}
      draggableId={variantForm.fieldId}
      index={index}
      isDragDisabled={!isSelected}
    >
      {provided => (
        <PresenceAnimation
          shouldAnimate={actions.shouldAnimate}
          isVisible={actions.isVisible}
          onAnimationComplete={actions.onAnimationComplete}
        >
          <Box
            ref={provided.innerRef}
            bg={isSelected ? 'gray.100' : 'white'}
            _hover={{ bg: isSelected ? 'gray.100' : 'gray.50' }}
            borderRadius="full"
            fontWeight="medium"
            borderWidth="1px"
            onClick={actions.onClick}
            px={3}
            cursor="pointer"
            {...rest}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <HStack spacing={1} height={8} overflow="hidden">
              <Text
                fontWeight="medium"
                noOfLines={1}
                flexShrink={0}
                fontSize="sm"
              >
                {children}
              </Text>

              <Menu
                canRemove={canRemove}
                onClone={() => onClone(index)}
                onEditName={() => onEditName(index)}
                onDelete={actions.onRemoveRequest}
              />
            </HStack>
          </Box>
        </PresenceAnimation>
      )}
    </Draggable>
  )
}

export default memo(VariantItem)
