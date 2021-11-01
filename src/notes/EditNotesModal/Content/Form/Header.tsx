import { ModalHeader, Text } from '@chakra-ui/react'

type Props = {
  ownerName: string
  notes?: string
}

function Header({ ownerName, notes }: Props) {
  const titlePrefix = notes ? 'Edit notes of' : 'Add notes to'

  return (
    <ModalHeader fontWeight="normal" mr={3}>
      {titlePrefix}{' '}
      <Text as="span" fontSize="xl" fontWeight="bold">
        {ownerName}
      </Text>
    </ModalHeader>
  )
}

export default Header
