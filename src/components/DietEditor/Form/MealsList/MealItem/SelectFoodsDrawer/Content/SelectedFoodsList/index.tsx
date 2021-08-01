import { Flex, Text, Wrap } from '@chakra-ui/react'
import { Selection } from 'general/useSelection'
import { Food } from 'core/types'
import SelectedFoodItem from './SelectedFoodItem'

type Props = {
  selection: Selection<Food>
}

function SelectedFoods({ selection }: Props) {
  const { selectedItems: selectedFoods } = selection

  function onFoodUnselect(food: Food) {
    selection.onToggleItem(food)
  }

  return (
    <Flex alignItems="center" minHeight="56px">
      {selectedFoods.length > 0 ? (
        <Wrap spacing={2}>
          {selectedFoods.map(food => (
            <SelectedFoodItem
              key={food.id}
              food={food}
              onUnselect={onFoodUnselect}
            />
          ))}
        </Wrap>
      ) : (
        <Text textColor="gray.400">No foods selected</Text>
      )}
    </Flex>
  )
}

export default SelectedFoods
