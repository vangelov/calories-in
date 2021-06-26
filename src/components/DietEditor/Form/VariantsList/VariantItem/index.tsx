import { Box, Button, HStack, LayoutProps, SpaceProps } from '@chakra-ui/react'
import { getInsertVariantFormAnimationKey, VariantField } from 'core/dietForm'
import { ReactNode, useState } from 'react'
import Menu from './Menu'
import { Draggable } from 'react-beautiful-dnd'
import { motion } from 'framer-motion'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'

type Props = {
  children: ReactNode
  onDelete: (index: number) => void
  onClone: (index: number) => void
  onEditName: (index: number) => void
  isSelected: boolean
  onSelect: (variantField: VariantField) => void
  variantField: VariantField
  canRemove: boolean
  index: number
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
  variantField,
  canRemove,
  index,
  ...rest
}: Props) {
  const oneTimeCheck = useOneTimeCheck()
  const [isVisible, setIsVisible] = useState(true)

  function onAnimationComplete() {
    if (!isVisible) {
      onDelete(index)
    }
  }

  if (!variantField.fieldId) {
    throw new Error()
  }

  const pendingAnimationForInserted = oneTimeCheck.checkAndReset(
    getInsertVariantFormAnimationKey(variantField.fieldId)
  )

  return (
    <Draggable
      key={variantField.fieldId}
      draggableId={variantField.fieldId as string}
      index={index}
    >
      {provided => (
        <motion.div
          transition={{ ease: 'easeInOut' }}
          style={{
            opacity: pendingAnimationForInserted ? 0 : 1,
          }}
          initial={pendingAnimationForInserted ? 'collapsed' : false}
          animate={isVisible ? 'open' : 'collapsed'}
          onAnimationComplete={onAnimationComplete}
          variants={variants}
        >
          <Box
            ref={provided.innerRef}
            bg={isSelected ? 'gray.100' : 'white'}
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

export default VariantItem
