import { Box, BoxProps, Flex, Text } from '@chakra-ui/react'
import { Portion, getPortionDescription } from 'portions'
import { Check } from 'react-feather'

type Props = {
  portion: Portion
  isSelected: boolean
} & BoxProps

function PortionItem({ portion, isSelected, ...rest }: Props) {
  const { unit } = portion

  return (
    <Box
      position="relative"
      as="button"
      width="100%"
      textAlign="left"
      borderRadius={4}
      p={3}
      fontSize="sm"
      fontWeight="semibold"
      _hover={{ bg: 'gray.50' }}
      _active={{
        bg: 'gray.100',
      }}
      {...rest}
    >
      <Flex justifyContent="space-between">
        <Text
          color={isSelected ? 'teal.600' : undefined}
          fontSize="md"
          fontWeight="500"
        >
          {unit}{' '}
          <Text as="span" color={isSelected ? 'teal.600' : 'gray.500'}>
            {getPortionDescription(portion)}
          </Text>
        </Text>
        {isSelected && (
          <Flex alignItems="center">
            <Check color="green" size={20} />
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default PortionItem
