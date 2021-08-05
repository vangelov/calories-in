import { Flex, Box } from '@chakra-ui/react'
import VariantItem from './VariantItem'
import { Plus } from 'react-feather'
import { Droppable } from 'react-beautiful-dnd'
import VariantModal from './VariantModal'
import { useRef } from 'react'
import { useDietForm, VariantForm } from 'core/diets'
import useActions from './useActions'
import ResponsiveIconButton from 'components/general/ResponsiveIconButton'

type Props = {
  onVariantFormSelect: (variantForm: VariantForm) => void
  onVariantFormCopy: () => void
}

function VariantsList({ onVariantFormSelect, onVariantFormCopy }: Props) {
  const appendButtonRef = useRef<HTMLDivElement>(null)
  const actions = useActions({
    onVariantFormSelect,
    onVariantFormCopy,
    appendButtonRef,
  })
  const dietForm = useDietForm()

  return (
    <Droppable
      droppableId="variantsList"
      type="variantsList"
      direction="horizontal"
    >
      {(provided, snapshot) => (
        <Flex ref={provided.innerRef}>
          {dietForm.variantsForms.map((variantForm, index) => {
            return (
              <VariantItem
                canRemove={dietForm.variantsForms.length > 1}
                mr={1}
                index={index}
                onDelete={actions.onRemove}
                onEditName={actions.onRename}
                onClone={actions.onCopy}
                key={variantForm.fieldId}
                variantForm={variantForm}
                isSelected={index === dietForm.selectedVariantFormIndex}
                onSelect={actions.onSelect}
                onFirstAppear={actions.onVariantItemFirstAppear}
              >
                {variantForm.name}
              </VariantItem>
            )
          })}

          {provided.placeholder}

          <Flex
            ml={2}
            ref={appendButtonRef}
            opacity={snapshot.isUsingPlaceholder ? 0 : 1}
            transition="140ms opacity ease-out"
          >
            <ResponsiveIconButton
              borderRadius="full"
              size="sm"
              aria-label="Add variant"
              icon={<Plus size={20} pointerEvents="none" />}
              variant="outline"
              onClick={actions.onAppend}
              isResponsive={false}
            />

            <Box width={3} height={3} />
          </Flex>

          <VariantModal
            isOpen={actions.modalDisclosure.isOpen}
            onClose={actions.onVariantModalClose}
            submitAction={actions.submitAction}
            variantFormIndex={actions.variantFormIndex}
          />
        </Flex>
      )}
    </Droppable>
  )
}

export default VariantsList
