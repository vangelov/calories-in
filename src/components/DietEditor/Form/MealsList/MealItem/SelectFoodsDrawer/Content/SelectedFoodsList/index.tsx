import { Flex, Text, Wrap } from '@chakra-ui/react'
import { Selection, Item } from 'general/useSelection'
import { Food } from 'core/types'
import SelectedFoodItem from './SelectedFoodItem'
import { useFoods } from 'core/foods'

type Props = {
  selection: Selection<Item>
}

function SelectedFoods({ selection }: Props) {
  const { selectedItems: selectedFoods } = selection
  const { foodsById } = useFoods()

  function onFoodUnselect(food: Food) {
    selection.onToggleItem(food)
  }

  return (
    <Flex alignItems="center" minHeight="56px">
      {selectedFoods.length > 0 ? (
        <Wrap spacing={2}>
          {selectedFoods.map(({ id }) => (
            <SelectedFoodItem
              key={id}
              food={foodsById[id]}
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
