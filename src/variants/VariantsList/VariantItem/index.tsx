import { Text, HStack, LayoutProps, SpaceProps } from '@chakra-ui/react'
import { VariantForm } from 'variants'
import { ForwardedRef, forwardRef, ReactNode, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { memo } from 'react'
import PresenceAnimation from './PresenceAnimation'
import useVariantFormEvents from './useVariantFormEvents'
import mergeRefs from 'react-merge-refs'
import { ContextMenuFlex, MenuOrDrawer } from 'general'
import useScrollIntoView from './useScrollIntoView'
import getMenuOrDrawerItems from './getMenuOrDrawerItems'

type Props = {
  children: ReactNode
  onDelete: (index: number) => void
  onClone: (index: number) => void
  onViewDetails: (variantForm: VariantForm) => void
  onEditName: (index: number) => void
  isSelected: boolean
  onSelect: (variantForm: VariantForm, index: number) => void
  variantForm: VariantForm
  canRemove: boolean
  index: number
  forwardedRef?: ForwardedRef<HTMLDivElement>
} & LayoutProps &
  SpaceProps

function VariantItem({
  onClone,
  onEditName,
  onDelete,
  children,
  isSelected,
  onSelect,
  onViewDetails,
  variantForm,
  canRemove,
  index,
  forwardedRef,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const variantFormEvents = useVariantFormEvents({
    onSelect,
    onDelete,
    variantForm,
    index,
    ref,
  })

  useScrollIntoView({ isSelected, ref })

  const menuOrDrawerItems = getMenuOrDrawerItems({
    canRemove,
    onClone: () => onClone(index),
    onEditName: () => onEditName(index),
    onDelete: variantFormEvents.onRemoveRequest,
    onViewDetails: () => onViewDetails(variantForm),
  })

  return (
    <Draggable
      key={variantForm.fieldId}
      draggableId={variantForm.fieldId}
      index={index}
      isDragDisabled={!isSelected}
    >
      {provided => {
        const refs = [provided.innerRef, ref]

        if (forwardedRef) {
          refs.push(forwardedRef)
        }

        return (
          <PresenceAnimation
            shouldAnimate={variantFormEvents.shouldAnimate}
            isVisible={variantFormEvents.isVisible}
            onAnimationComplete={variantFormEvents.onAnimationComplete}
          >
            <ContextMenuFlex
              ref={mergeRefs(refs)}
              bg="white"
              _hover={{ color: !isSelected ? 'teal.600' : undefined }}
              borderRadius="full"
              fontWeight="medium"
              borderWidth="1px"
              borderColor={isSelected ? 'teal.600' : 'gray.200'}
              color={isSelected ? 'teal.600' : 'gray.600'}
              onClick={variantFormEvents.onClick}
              pl={5}
              pr={4}
              height="40px"
              cursor="pointer"
              alignItems="center"
              menuOrDrawerItems={menuOrDrawerItems}
              {...rest}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <HStack spacing={1} height={8} overflow="hidden">
                <Text
                  fontWeight="semibold"
                  noOfLines={1}
                  flexShrink={0}
                  fontSize="md"
                >
                  {children}
                </Text>

                <MenuOrDrawer
                  title="Day"
                  borderRadius="full"
                  aria-label="Day actions"
                >
                  {menuOrDrawerItems}
                </MenuOrDrawer>
              </HStack>
            </ContextMenuFlex>
          </PresenceAnimation>
        )
      }}
    </Draggable>
  )
}

export default memo(
  forwardRef<HTMLDivElement, Props>((props, ref) => (
    <VariantItem {...props} forwardedRef={ref} />
  ))
)
