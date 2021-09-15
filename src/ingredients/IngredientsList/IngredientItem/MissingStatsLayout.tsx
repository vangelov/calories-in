import { StatsLayout as StatsLayoutBase } from 'stats'
import { RightAligned } from 'layout'
import { Button, Flex, Text } from '@chakra-ui/react'

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
            size="sm"
            colorScheme="red"
            onClick={onRemoveRequest}
          >
            Remove
          </Button>
        </RightAligned>
      }
    />
  )
}

export default MissingStatsLayout
