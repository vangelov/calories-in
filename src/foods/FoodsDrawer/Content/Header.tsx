import { DrawerHeader, Text } from '@chakra-ui/react'

type Props = {
  mealName?: string
  canSelect: boolean
}

function Header({ mealName, canSelect }: Props) {
  const fontWeight = mealName ? 'normal' : 'bold'
  const titlePrefix = mealName
    ? 'Add Foods to '
    : canSelect
    ? 'Add Foods'
    : 'Foods'

  return (
    <DrawerHeader fontWeight={fontWeight}>
      {titlePrefix}

      {mealName && (
        <Text as="span" fontSize="xl" mr={3} fontWeight="bold">
          {mealName}
        </Text>
      )}
    </DrawerHeader>
  )
}

export default Header
