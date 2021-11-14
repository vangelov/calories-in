import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
  Box,
} from '@chakra-ui/react'
import { useDietForm } from 'diets'
import { Droppable } from 'react-beautiful-dnd'
import VariantItem from './VariantItem'

type Props = {
  onClose: () => void
}

function Content({ onClose }: Props) {
  const dietForm = useDietForm()

  return (
    <ModalContent>
      <ModalHeader>Reorder Variants</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Droppable droppableId="variantsList" type="variantsList">
          {provided => (
            <Box ref={provided.innerRef} spacing={3}>
              {dietForm.variantsForms.map((variantForm, index) => {
                return (
                  <VariantItem
                    canRemove={dietForm.variantsForms.length > 1}
                    index={index}
                    key={variantForm.fieldId}
                    variantForm={variantForm}
                    mb={2}
                    isSelected={index === dietForm.selectedVariantFormIndex}
                  >
                    {variantForm.name}
                  </VariantItem>
                )
              })}

              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  )
}

export type { Props }

export default Content
