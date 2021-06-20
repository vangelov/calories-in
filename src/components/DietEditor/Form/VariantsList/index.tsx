import { Flex, IconButton, Box } from '@chakra-ui/react'
import { VariantsFieldArray } from 'core/dietForm/useVariantsFieldArray'
import VariantItem from './VariantItem'
import { Plus } from 'react-feather'
import { Droppable } from 'react-beautiful-dnd'
import useReorderVariantsForms from 'core/mealsDnd/useReorderVariantsForms'
import VariantNameModal from './VariantNameModal'
import useAddOrEditVariant from './useAddOrEditVariant'

type Props = {
  variantsFieldArray: VariantsFieldArray
}

function VariantsList({ variantsFieldArray }: Props) {
  const addOrEditVariant = useAddOrEditVariant({ variantsFieldArray })
  useReorderVariantsForms({ variantsFieldArray })

  return (
    <Droppable
      droppableId="variantsList"
      type="variantsList"
      direction="horizontal"
    >
      {(provided, snapshot) => (
        <Flex ref={provided.innerRef}>
          {variantsFieldArray.variantsFields.map((variantField, index) => {
            return (
              <VariantItem
                mr={1}
                index={index}
                onDelete={variantsFieldArray.onRemoveVariantForm}
                onEditName={addOrEditVariant.onEdit}
                onClone={addOrEditVariant.onCloneExisting}
                key={variantField.fieldId}
                variantField={variantField}
                isSelected={
                  index === variantsFieldArray.selectedVariantFormIndex
                }
                onSelect={() =>
                  variantsFieldArray.setSelectedVariantFormIndex(index)
                }
              >
                {variantField.name}
              </VariantItem>
            )
          })}

          {provided.placeholder}

          <Flex
            opacity={snapshot.isUsingPlaceholder ? 0 : 1}
            transition="140ms opacity ease-out"
          >
            <IconButton
              borderRadius="full"
              size="sm"
              aria-label="Add variant"
              icon={<Plus size={20} pointerEvents="none" />}
              variant="outline"
              onClick={addOrEditVariant.onAddNew}
            />
            <Box width={3} height={3} />
          </Flex>

          <VariantNameModal
            title="Test"
            isOpen={addOrEditVariant.isModalOpen}
            onClose={addOrEditVariant.onModalClose}
            onSave={addOrEditVariant.onModalSave}
            existingVariantsNames={addOrEditVariant.existingVariantsNames}
          />
        </Flex>
      )}
    </Droppable>
  )
}

export default VariantsList
