import { StatsLayout as StatsLayoutBase } from 'stats'
import { RightAligned } from 'layout'
import { Flex, Text, Button } from '@chakra-ui/react'
import { Trash2 } from 'react-feather'

type Props = {
  onRemoveRequest: () => void
}

function MissingStatsLayout({ onRemoveRequest }: Props) {
  return (
    <StatsLayoutBase
      prefersAmount={true}
      nameElement={
        <Flex height="100%" justifyContent="center" flexDirection="column">
          <Text fontSize={{ base: 'sm', md: 'md' }} textColor="red.400" ml={3}>
            Food not found
          </Text>
        </Flex>
      }
      amountElement={<div />}
      energyElement={<div />}
      proteinElement={<div />}
      carbsElement={<div />}
      fatElement={<div />}
      menuElement={
        <RightAligned>
          <Button
            mr={3}
            alignSelf="flex-end"
            variant="outline"
            colorScheme="red"
            size="sm"
            onClick={onRemoveRequest}
            leftIcon={<Trash2 size={16} />}
          >
            Remove
          </Button>
        </RightAligned>
      }
    />
  )
}

export default MissingStatsLayout
