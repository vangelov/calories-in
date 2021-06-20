import { Flex, Text, HStack, LayoutProps, SpaceProps } from '@chakra-ui/react'
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
      {provided => {
        return (
          <HStack
            ref={provided.innerRef}
            bg={isSelected ? 'gray.100' : 'white'}
            borderRadius="full"
            fontWeight="medium"
            borderWidth="1px"
            onClick={() => onSelect(variantField)}
            px={3}
            py={1}
            {...rest}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            cursor="pointer"
          >
            <Flex cursor="pointer">
              <Text fontSize="sm">{children}</Text>
            </Flex>

            <Menu
              onClone={() => onClone(index)}
              onDelete={() => onDelete(index)}
            />
          </HStack>
        )
      }}
    </Draggable>
  )
}

export default VariantItem
