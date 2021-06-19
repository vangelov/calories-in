import { Box, Button, HStack, LayoutProps, SpaceProps } from '@chakra-ui/react'
import { VariantField } from 'core/dietForm/variantForm'
import { ReactNode } from 'react'
import Menu from './Menu'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  children: ReactNode
  onDelete: (index: number) => void
  onClone: (index: number) => void

  isSelected: boolean
  onSelect: (variantField: VariantField) => void
  variantField: VariantField
  index: number
} & LayoutProps &
  SpaceProps

function VariantItem({
  onClone,
  onDelete,
  children,
  isSelected,
  onSelect,
  variantField,
  index,
  ...rest
}: Props) {
  return (
    <Draggable
      key={variantField.fieldId}
      draggableId={variantField.fieldId as string}
      index={index}
    >
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          bg={isSelected ? 'gray.100' : undefined}
          borderRadius="full"
          fontWeight="medium"
          borderWidth="1px"
          px={3}
          {...rest}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <HStack spacing={1}>
            <Button
              pointerEvents={isSelected ? 'none' : 'all'}
              size="sm"
              variant="unstyled"
              onClick={() => onSelect(variantField)}
            >
              {children}
            </Button>

            <Menu
              onClone={() => onClone(index)}
              onDelete={() => onDelete(index)}
            />
          </HStack>
        </Box>
      )}
    </Draggable>
  )
}

export default VariantItem
