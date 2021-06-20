import { Flex, IconButton, Box, useDisclosure } from '@chakra-ui/react'
import { DietForm } from 'core/dietForm'
import { VariantsFieldArray } from 'core/dietForm/useVariantsFieldArray'
import { VariantField, VariantForm } from 'core/dietForm/variantForm'
import { useFormContext } from 'react-hook-form'
import VariantItem from './VariantItem'
import { v4 as uuidv4 } from 'uuid'
import { Plus } from 'react-feather'
import { Droppable } from 'react-beautiful-dnd'
import useReorderVariantsForms from 'core/mealsDnd/useReorderVariantsForms'
import VariantNameModal from './VariantNameModal'
import useAddOrEditVariant from './useAddOrEditVariant'

type Props = {
  variantsFieldArray: VariantsFieldArray
}

const deepCopy = (value: any, replacer?: (key: string, value: any) => any) =>
  JSON.parse(JSON.stringify(value, replacer))

function VariantsList({ variantsFieldArray }: Props) {
  const { getValues } = useFormContext<DietForm>()
  const addOrEditVariant = useAddOrEditVariant({ variantsFieldArray })

  function onClone(index: number) {
    const values = getValues()
    const originalVariantForm = values.variantsForms[index]
    const copiedVariantForm = deepCopy(
      originalVariantForm,
      (key: string, value: any) => {
        if (key === 'fieldId') {
          return uuidv4()
        }

        return value
      }
    ) as VariantForm

    variantsFieldArray.onAppendVariantForm(copiedVariantForm)
    variantsFieldArray.setSelectedVariantFieldId(copiedVariantForm.fieldId)
  }

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
                onClone={onClone}
                key={variantField.fieldId}
                variantField={variantField}
                isSelected={
                  variantField.fieldId ===
                  variantsFieldArray.selectedVariantFieldId
                }
                onSelect={(selectedVariantField: VariantField) =>
                  variantsFieldArray.setSelectedVariantFieldId(
                    selectedVariantField.fieldId as string
                  )
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
            isOpen={addOrEditVariant.isModalOpen}
            onClose={addOrEditVariant.onModalClose}
            onSave={addOrEditVariant.onModalSave}
          />
        </Flex>
      )}
    </Droppable>
  )
}

export default VariantsList
