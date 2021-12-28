import { Flex, Text, Button } from '@chakra-ui/react'
import { Trash2 } from 'react-feather'

type Props = {
  onRemoveRequest: () => void
}

function MissingStatsLayout({ onRemoveRequest }: Props) {
  return (
    <Flex width="100%" justifyContent="space-between" align="center">
      <Text fontSize="md" textColor="red.400" ml={3}>
        Food not found
      </Text>

      <Button
        mr={3}
        alignSelf="flex-end"
        variant="ghost"
        colorScheme="red"
        size="sm"
        onClick={onRemoveRequest}
        leftIcon={<Trash2 size={16} />}
      >
        Remove
      </Button>
    </Flex>
  )
}

export default MissingStatsLayout
