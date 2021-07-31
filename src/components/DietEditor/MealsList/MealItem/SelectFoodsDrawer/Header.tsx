import { DrawerHeader, Text } from '@chakra-ui/react'

type Props = {
  mealName?: string
}

function Header({ mealName }: Props) {
  const fontWeight = mealName ? 'normal' : 'bold'
  const titlePrefix = mealName ? 'Add Foods to ' : 'Add Foods'

  return (
    <DrawerHeader fontWeight={fontWeight}>
      {titlePrefix}

      {mealName && (
        <Text as="span" fontSize="xl" fontWeight="bold">
          {mealName}
        </Text>
      )}
    </DrawerHeader>
  )
}

export default Header
