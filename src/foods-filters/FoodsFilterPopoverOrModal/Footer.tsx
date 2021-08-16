import { HStack, Button } from '@chakra-ui/react'
import {
  nonQueryChangesCount,
  useFoodsFilter,
  useFoodsFilterActions,
} from 'foods-filters'

type Props = {
  onClose: () => void
}

function Footer({ onClose }: Props) {
  const filter = useFoodsFilter()
  const foodsFilterActions = useFoodsFilterActions()

  const changesCount = nonQueryChangesCount(filter)

  function onReset() {
    foodsFilterActions.resetFilter()
    onClose()
  }

  return (
    <HStack spacing={3} justifyContent="flex-end">
      <Button variant="link" isDisabled={changesCount === 0} onClick={onReset}>
        Reset
      </Button>
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
    </HStack>
  )
}

export default Footer
