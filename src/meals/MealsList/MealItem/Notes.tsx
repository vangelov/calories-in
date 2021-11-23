import { Box, Text } from '@chakra-ui/react'

type Props = {
  notes: string
}

function Notes({ notes }: Props) {
  return (
    <Box borderTopColor="gray.100" borderTopWidth={1} p={3}>
      <Text fontSize="md" whiteSpace="pre-wrap" color="gray.600">
        {notes}
      </Text>
    </Box>
  )
}

export default Notes
