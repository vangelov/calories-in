import { Flex, Text } from '@chakra-ui/react'
import { Selection } from 'core/utils'
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
    <>
      {selectedFoods.length > 0 ? (
        <Flex mx={-1} flexWrap="wrap">
          {selectedFoods.map(food => (
            <SelectedFoodItem
              key={food.id}
              food={food}
              onUnselect={onFoodUnselect}
            />
          ))}
        </Flex>
      ) : (
        <Flex height={8} alignItems="center">
          <Text textColor="gray.400">No foods selected</Text>
        </Flex>
      )}
    </>
  )
}

export default SelectedFoods
