import { Box, BoxProps, Flex, Text } from '@chakra-ui/react'
import { Portion } from 'portions'
import { Check } from 'react-feather'

type Props = {
  portion: Portion
  isSelected: boolean
} & BoxProps

function PortionItem({ portion, id, isSelected, ...rest }: Props) {
  const { unit, millilitersPerAmount } = portion

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
        <Text fontSize="md" fontWeight="500">
          {unit}{' '}
          {id !== 'milliliters' && millilitersPerAmount && (
            <Text
              as="span"
              color="gray.500"
            >{`(${millilitersPerAmount} ml)`}</Text>
          )}
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
