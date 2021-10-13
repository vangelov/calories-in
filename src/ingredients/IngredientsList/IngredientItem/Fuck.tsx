import { Box, Text } from '@chakra-ui/react'
import { IngredientForm } from 'ingredients'
import PresenceAnimation from './PresenceAnimation'
import useNotesEvents from './useNotesEvents'

type Props = {
  ingredientForm: IngredientForm
  variantIndex: number
  mealIndex: number
  index: number
}

function Fuck({ variantIndex, mealIndex, index, ingredientForm }: Props) {
  const notesEvents = useNotesEvents({
    variantIndex,
    mealIndex,
    index,
    ingredientForm,
  })

  return (
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
  )
}

export default Fuck
