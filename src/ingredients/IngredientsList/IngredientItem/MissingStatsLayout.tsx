import { StatsLayout as StatsLayoutBase } from 'stats'
import { RightAligned } from 'layout'
import { ResponsiveButton } from 'general'
import { Flex, Text } from '@chakra-ui/react'

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
          <ResponsiveButton
            mr={3}
            alignSelf="flex-end"
            variant="outline"
            colorScheme="red"
            onClick={onRemoveRequest}
          >
            Remove
          </ResponsiveButton>
        </RightAligned>
      }
    />
  )
}

export default MissingStatsLayout
