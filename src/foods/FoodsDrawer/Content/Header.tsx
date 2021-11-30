import { DrawerHeader, Text } from '@chakra-ui/react'
import { MealForm } from 'meals'

type Props = {
  mealName?: string
  canSelect: boolean
  mealForm?: MealForm
}

function getTitlePrefix(props: Props) {
  const { mealName, canSelect, mealForm } = props

  if (!mealForm && mealName) {
    return 'Select Foods for '
  }

  if (canSelect) {
    return mealName ? 'Add Foods to ' : 'Add Foods'
  }

  return 'Foods'
}

function Header(props: Props) {
  const { mealName } = props
  const fontWeight = mealName ? 'normal' : 'bold'
  let titlePrefix = getTitlePrefix(props)

  return (
    <DrawerHeader fontWeight={fontWeight} mr={3}>
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
