import { Flex, IconButton, Box } from '@chakra-ui/react'
import VariantItem from './VariantItem'
import { Plus } from 'react-feather'
import { Droppable } from 'react-beautiful-dnd'
import VariantNameModal from './VariantNameModal'
import useVariantActions from './useVariantActions'
import { useRef } from 'react'
import {
  useVariantsFormsStoreMethods,
  useVariantsFormsStoreState,
} from 'core/diets'

function VariantsList() {
  const variantActions = useVariantActions()
  const appendButtonRef = useRef<HTMLDivElement>(null)

  const variantsFormsStoreMethods = useVariantsFormsStoreMethods()
  const {
    variantsFields,
    selectedVariantFormIndex,
  } = useVariantsFormsStoreState()

  function onVariantItemFirstAppear() {
    appendButtonRef.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }

  return (
    <Droppable
      droppableId="variantsList"
      type="variantsList"
      direction="horizontal"
    >
      {(provided, snapshot) => (
        <Flex ref={provided.innerRef}>
          {variantsFields.map((variantField, index) => {
            return (
              <VariantItem
                canRemove={variantsFields.length > 1}
                mr={1}
                index={index}
                onDelete={variantsFormsStoreMethods.removeVariantForm}
                onEditName={variantActions.onRename}
                onClone={variantActions.onClone}
                key={variantField.fieldId}
                variantField={variantField}
                isSelected={index === selectedVariantFormIndex}
                onSelect={() => {
                  variantsFormsStoreMethods.setSelectedVariantFormIndex(index)
                }}
                onFirstAppear={onVariantItemFirstAppear}
              >
                {variantField.name}
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
            <IconButton
              borderRadius="full"
              size="sm"
              aria-label="Add variant"
              icon={<Plus size={20} pointerEvents="none" />}
              variant="outline"
              onClick={variantActions.onAppend}
            />
            <Box width={3} height={3} />
          </Flex>

          <VariantNameModal
            title={variantActions.modalTitle}
            isOpen={variantActions.isModalOpen}
            onClose={variantActions.onModalClose}
            onSave={variantActions.onModalSave}
            existingVariantsNames={variantActions.existingVariantsNames}
          />
        </Flex>
      )}
    </Droppable>
  )
}

export default VariantsList
