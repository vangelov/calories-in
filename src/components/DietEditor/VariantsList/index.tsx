import { Flex, IconButton, Box, useDisclosure } from '@chakra-ui/react'
import VariantItem from './VariantItem'
import { Plus } from 'react-feather'
import { Droppable } from 'react-beautiful-dnd'
import VariantNameModal from './VariantNameModal'
import { useRef, useState, useCallback } from 'react'
import { VariantNameFormSubmitAction } from 'core/diets/variantForm/useSubmitVariantForm'
import { isSafari } from 'react-device-detect'
import { useDietForm, useDietFormActions } from 'core/diets'

function VariantsList() {
  const modalDisclosure = useDisclosure()
  const [submitAction, setSubmitAction] = useState<VariantNameFormSubmitAction>(
    'append'
  )
  const appendButtonRef = useRef<HTMLDivElement>(null)
  const [variantFormIndex, setVariantFormIndex] = useState<number>()
  const dietFormActions = useDietFormActions()
  const dietForm = useDietForm()

  const onVariantItemFirstAppear = useCallback(() => {
    // Safari also scrolls the meals list if behaviour is 'smooth'
    appendButtonRef.current?.scrollIntoView(
      isSafari
        ? undefined
        : {
            block: 'start',
            behavior: 'smooth',
          }
    )
  }, [])

  const { onOpen } = modalDisclosure

  const onRename = useCallback(
    (index: number) => {
      setSubmitAction('rename')
      setVariantFormIndex(index)
      onOpen()
    },
    [onOpen]
  )

  const onCopy = useCallback(
    (index: number) => {
      setSubmitAction('copy')
      setVariantFormIndex(index)
      onOpen()
    },
    [onOpen]
  )

  const onAppend = useCallback(() => {
    setSubmitAction('append')
    setVariantFormIndex(undefined)
    onOpen()
  }, [onOpen])

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
                onDelete={dietFormActions.removeVariantForm}
                onEditName={onRename}
                onClone={onCopy}
                key={variantForm.fieldId}
                variantForm={variantForm}
                isSelected={index === dietForm.selectedVariantFormIndex}
                onSelect={dietFormActions.setSelectedVariantFormIndex}
                onFirstAppear={onVariantItemFirstAppear}
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
            onClose={modalDisclosure.onClose}
            submitAction={submitAction}
            variantFormIndex={variantFormIndex}
          />
        </Flex>
      )}
    </Droppable>
  )
}

export default VariantsList
