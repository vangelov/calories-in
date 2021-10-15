import { Box, Text, UseDisclosureReturn } from '@chakra-ui/react'
import { IngredientForm } from 'ingredients'
import { EditNotesModal } from 'notes'
import PresenceAnimation from './PresenceAnimation'
import useNotesEvents from './useNotesEvents'

type Props = {
  ingredientForm: IngredientForm
  variantIndex: number
  mealIndex: number
  index: number
  editNotesModalDisclosure: UseDisclosureReturn
}

function Fuck({
  variantIndex,
  mealIndex,
  index,
  ingredientForm,
  editNotesModalDisclosure,
}: Props) {
  const notesEvents = useNotesEvents({
    variantIndex,
    mealIndex,
    index,
    ingredientForm,
  })

  return (
    <>
      {ingredientForm.notes && (
        <PresenceAnimation
          shouldAnimate={notesEvents.shouldAnimateNotes}
          isVisible={notesEvents.areNotesVisible}
          onAnimationComplete={notesEvents.onNotesAnimationComplete}
        >
          <Box width="100%">
            <Text fontSize="sm" textColor="gray.400">
              {ingredientForm.notes}
            </Text>
          </Box>
        </PresenceAnimation>
      )}

      <EditNotesModal
        isOpen={editNotesModalDisclosure.isOpen}
        onClose={editNotesModalDisclosure.onClose}
        notes={ingredientForm.notes}
        onEditNotes={notesEvents.onEditNotes}
        fieldId={ingredientForm.fieldId}
      />
    </>
  )
}

export default Fuck
