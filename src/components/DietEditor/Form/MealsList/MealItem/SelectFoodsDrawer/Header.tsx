import { DrawerHeader, Text } from '@chakra-ui/react'

type Props = {
  mealName?: string
}

function Header({ mealName }: Props) {
  const fontWeight = mealName ? 'normal' : 'bold'
  const titlePrefix = mealName ? 'Add Ingredients to ' : 'Add Ingredients'

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
