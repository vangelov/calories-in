import { Flex, IconButton, Box, useDisclosure } from '@chakra-ui/react'
import VariantItem from './VariantItem'
import { Plus } from 'react-feather'
import { Droppable } from 'react-beautiful-dnd'
import VariantNameModal from './VariantNameModal'
import { useRef, useState } from 'react'
import {
  useVariantsFormsStoreMethods,
  useVariantsFormsStoreState,
  VariantField,
  VariantNameFormSubmitAction,
} from 'core/diets'
import { isSafari } from 'react-device-detect'

function VariantsList() {
  const modalDisclosure = useDisclosure()
  const [submitAction, setSubmitAction] = useState<VariantNameFormSubmitAction>(
    'append'
  )
  const [
    selectedVariantFieldIndex,
    setSelectedVariantFieldIndex,
  ] = useState<number>()
  const appendButtonRef = useRef<HTMLDivElement>(null)
  const [variantField, setVariantField] = useState<VariantField>()

  const variantsFormsStoreMethods = useVariantsFormsStoreMethods()
  const {
    variantsFields,
    selectedVariantFormIndex,
  } = useVariantsFormsStoreState()

  function onVariantItemFirstAppear() {
    // Safari also scrolls the meals list if behaviour is 'smooth'
    appendButtonRef.current?.scrollIntoView(
      isSafari
        ? undefined
        : {
            block: 'start',
            behavior: 'smooth',
          }
    )
  }

  function onRename(index: number) {
    modalDisclosure.onOpen()
    setSubmitAction('rename')
    setSelectedVariantFieldIndex(index)
    setVariantField(variantsFields[index])
  }

  function onCopy(index: number) {
    setSubmitAction('copy')
    setSelectedVariantFieldIndex(index)
    setVariantField(variantsFields[index])

    modalDisclosure.onOpen()
  }

  function onAppend() {
    setSubmitAction('append')
    setSelectedVariantFieldIndex(undefined)
    setVariantField(undefined)

    modalDisclosure.onOpen()
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
                onEditName={onRename}
                onClone={onCopy}
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
              onClick={onAppend}
            />
            <Box width={3} height={3} />
          </Flex>

          <VariantNameModal
            isOpen={modalDisclosure.isOpen}
            selectedVariantFieldIndex={selectedVariantFieldIndex}
            onClose={modalDisclosure.onClose}
            variantsFields={variantsFields}
            submitAction={submitAction}
            variantField={variantField}
          />
        </Flex>
      )}
    </Droppable>
  )
}

export default VariantsList
