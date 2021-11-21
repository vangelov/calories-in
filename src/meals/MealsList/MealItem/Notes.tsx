import { Box, UnorderedList, ListItem } from '@chakra-ui/react'

type Props = {
  notes: string
}

function Notes({ notes }: Props) {
  const lines = notes.split('\n').filter(line => line.length > 0)

  return (
    <Box borderTopColor="gray.100" borderTopWidth={1} p={3}>
      <UnorderedList spacing={3}>
        {lines.map(line => (
          <ListItem fontSize="md" color="gray.600" key={line}>
            {line}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default Notes
