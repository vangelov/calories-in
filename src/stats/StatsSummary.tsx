import { VStack, Flex, Text, BoxProps, Divider, Button } from '@chakra-ui/react'

type Props = {} & BoxProps

function StatsSummary({ ...rest }: Props) {
  return (
    <VStack
      p={5}
      spacing={3}
      align="stretch"
      alignSelf="flex-start"
      justify="left"
      {...rest}
    >
      <Flex justifyContent="space-between">
        <Text fontSize="lg" fontWeight="bold">
          Calories{' '}
          <Text as="span" fontSize="md" fontWeight="normal">
            (+200kcal)
          </Text>
        </Text>
        <Text fontSize="lg" fontWeight="medium">
          1000kcal
        </Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontSize="lg" fontWeight="medium">
          Protein{' '}
          <Text as="span" fontSize="md" fontWeight="normal">
            (20%)
          </Text>
        </Text>
        <Text fontSize="lg">150g</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontSize="lg" fontWeight="medium">
          Carbs{' '}
          <Text as="span" fontSize="md" fontWeight="normal">
            (20%)
          </Text>
        </Text>
        <Text fontSize="lg">300g</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontSize="lg" fontWeight="medium">
          Fat{' '}
          <Text as="span" fontSize="md" fontWeight="normal">
            (20%)
          </Text>
        </Text>
        <Text fontSize="lg">50g</Text>
      </Flex>

      <Divider />

      <Flex justifyContent="space-between">
        <Text fontSize="lg">
          Saturated fat{' '}
          <Text as="span" fontSize="md" fontWeight="normal">
            (20%)
          </Text>
        </Text>
        <Text fontSize="lg">10g</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontSize="lg">
          Sugar{' '}
          <Text as="span" fontSize="md" fontWeight="normal">
            (20%)
          </Text>
        </Text>
        <Text fontSize="lg">10g</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text fontSize="lg">Sodium </Text>
        <Text fontSize="lg">10g</Text>
      </Flex>

      <Divider />

      <Button colorScheme="teal" variant="link">
        View Details
      </Button>
    </VStack>
  )
}

export default StatsSummary
