import { Flex, Text, Wrap } from '@chakra-ui/react'
import { Selection } from 'general'
import SelectedFoodItem from './SelectedFoodItem'
import { Food, useFoods } from 'foods'

type Props = {
  selection: Selection<Food>
}

function SelectedFoods({ selection }: Props) {
  const { selectedItems: selectedFoods } = selection
  const { foodsById } = useFoods()

  return (
    <Flex alignItems="center" minHeight="56px">
      {selectedFoods.length > 0 ? (
        <Wrap spacing={2}>
          {selectedFoods.map(({ id }) => (
            <SelectedFoodItem
              key={id}
              food={foodsById[id]}
              onUnselect={selection.toggleItem}
            />
          ))}
        </Wrap>
      ) : (
        <Text textColor="gray.500">Select one or more foods</Text>
      )}
    </Flex>
  )
}

export default SelectedFoods
