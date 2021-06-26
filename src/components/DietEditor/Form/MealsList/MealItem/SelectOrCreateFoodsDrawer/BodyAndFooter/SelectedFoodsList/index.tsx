import { Flex, Text, HStack, Box } from '@chakra-ui/react'
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
    <Box overflowX="scroll" my={3} py={3}>
      {selectedFoods.length > 0 ? (
        <HStack spacing={2}>
          {selectedFoods.map(food => (
            <SelectedFoodItem
              key={food.id}
              food={food}
              onUnselect={onFoodUnselect}
            />
          ))}
        </HStack>
      ) : (
        <Flex alignItems="center">
          <Text textColor="gray.400">No foods selected</Text>
        </Flex>
      )}
    </Box>
  )
}

export default SelectedFoods
