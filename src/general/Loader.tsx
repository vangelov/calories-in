import { Spinner, Text, HStack } from '@chakra-ui/react'

type Props = {
  label: string
  size?: 'md' | 'lg'
}

function Loader({ label, size = 'md' }: Props) {
  return (
    <HStack spacing={2}>
      <Spinner size={size} color="teal" />
      <Text size={size}>{label}</Text>
    </HStack>
  )
}

export default Loader
