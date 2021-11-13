import { Box, BoxProps, Flex, Text } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { Check } from 'react-feather'

type Props = {
  name: string
  isSelected: boolean
} & BoxProps

function VariantItem({ name, isSelected, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && isSelected) {
      ref.current.scrollIntoView()
    }
  }, [isSelected])

  return (
    <Box
      ref={ref}
      position="relative"
      as="button"
      width="100%"
      textAlign="left"
      borderRadius={4}
      p={3}
      fontSize="sm"
      fontWeight="semibold"
      color={isSelected ? 'teal' : undefined}
      _hover={{ bg: 'gray.50' }}
      _active={{
        bg: 'gray.100',
      }}
      {...rest}
    >
      <Flex justifyContent="space-between">
        <Text fontSize="md" fontWeight="normal">
          {name}
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

export default VariantItem
