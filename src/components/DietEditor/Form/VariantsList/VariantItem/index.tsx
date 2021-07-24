import { Box, Text, HStack, LayoutProps, SpaceProps } from '@chakra-ui/react'
import { getInsertVariantFormAnimationKey, VariantForm } from 'core/diets'
import { ReactNode, useState } from 'react'
import Menu from './Menu'
import { Draggable } from 'react-beautiful-dnd'
import { motion } from 'framer-motion'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import { MouseEvent, memo } from 'react'

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

const variants = {
  open: {
    opacity: 1,
    width: 'auto',
    x: 0,
  },
  collapsed: { opacity: 0, width: 0, x: 0 },
}

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
  const oneTimeCheckActions = useOneTimeCheckActions()
  const [isVisible, setIsVisible] = useState(true)

  function onAnimationComplete() {
    if (pendingAnimationForInserted) {
      onFirstAppear && onFirstAppear()
    } else if (!isVisible) {
      onDelete(index)
    }
  }

  const pendingAnimationForInserted = oneTimeCheckActions.checkAndReset(
    getInsertVariantFormAnimationKey(variantForm.fieldId)
  )

  function onClick(event: MouseEvent<HTMLDivElement>) {
    const anyTarget: any = event.target

    if (
      anyTarget.type !== 'button' &&
      anyTarget.getAttribute('role') !== 'menuitem'
    ) {
      onSelect(index)
    }
  }

  return (
    <Draggable
      key={variantForm.fieldId}
      draggableId={variantForm.fieldId}
      index={index}
      isDragDisabled={!isSelected}
    >
      {provided => (
        <motion.div
          transition={{ ease: 'easeInOut' }}
          style={{
            opacity: pendingAnimationForInserted ? 0 : 1,
            flexShrink: 0,
          }}
          initial={pendingAnimationForInserted ? 'collapsed' : false}
          animate={isVisible ? 'open' : 'collapsed'}
          onAnimationComplete={onAnimationComplete}
          variants={variants}
        >
          <Box
            ref={provided.innerRef}
            bg={isSelected ? 'gray.100' : 'white'}
            _hover={{ bg: isSelected ? 'gray.100' : 'gray.50' }}
            borderRadius="full"
            fontWeight="medium"
            borderWidth="1px"
            onClick={onClick}
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
                onDelete={() => setIsVisible(false)}
              />
            </HStack>
          </Box>
        </motion.div>
      )}
    </Draggable>
  )
}

export default memo(VariantItem)
