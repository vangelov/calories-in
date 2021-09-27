import { VStack, Checkbox } from '@chakra-ui/react'
import { FoodCategoriesSelect } from 'foods-categories'
import { useFoodsFilter, useFoodsFilterActions } from 'foods-filters'
import { ChangeEvent, RefObject } from 'react'

type Props = {
  selectRef: RefObject<HTMLSelectElement>
}

function Content({ selectRef }: Props) {
  const filter = useFoodsFilter()
  const foodsFilterActions = useFoodsFilterActions()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target
    foodsFilterActions.updateFilter({ categoryId: Number(value) })
  }

  function onCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target
    foodsFilterActions.updateFilter({ onlyFoodsAddedByUser: checked })
  }

  return (
    <VStack spacing={5} p={1} alignItems="flex-start">
      <FoodCategoriesSelect
        ref={selectRef}
        flex={3}
        onChange={onSelectChange}
        value={filter.categoryId}
      >
        <option value={0}>All categories</option>
      </FoodCategoriesSelect>

      <Checkbox
        onChange={onCheckboxChange}
        colorScheme="teal"
        isChecked={Boolean(filter.onlyFoodsAddedByUser)}
      >
        Only items added by me
      </Checkbox>
    </VStack>
  )
}

export default Content
