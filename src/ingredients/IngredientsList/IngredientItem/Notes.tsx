import PresenceAnimation from './PresenceAnimation'
import { Box, Text } from '@chakra-ui/react'
import { NotesEvents } from './useNotesEvents'
import { IngredientForm } from 'ingredients'

type Props = {
  notesEvents: NotesEvents
  ingredientForm: IngredientForm
}

function Notes({ notesEvents, ingredientForm }: Props) {
  return (
    <PresenceAnimation
      shouldAnimate={notesEvents.shouldAnimateNotes}
      isVisible={notesEvents.areNotesVisible}
      onAnimationComplete={notesEvents.onNotesAnimationComplete}
    >
      <Box width="100%">
        <Text fontSize="sm" whiteSpace="pre-wrap" textColor="gray.500">
          {ingredientForm.notes}
        </Text>
      </Box>
    </PresenceAnimation>
  )
}

export default Notes
