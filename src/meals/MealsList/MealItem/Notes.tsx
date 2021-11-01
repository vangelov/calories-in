import { Box, Text } from '@chakra-ui/react'
import { MealForm } from 'meals'

type Props = {
  mealForm: MealForm
}

function Notes({ mealForm }: Props) {
  return (
    <Box borderTopColor="gray.100" borderTopWidth={1} p={3}>
      <Text fontSize="sm" whiteSpace="pre-wrap" color="gray.400">
        {mealForm.notes}
      </Text>
    </Box>
  )
}

export default Notes
