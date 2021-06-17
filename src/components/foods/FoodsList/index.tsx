import {
  Input,
  InputGroup,
  InputLeftElement,
  chakra,
  Flex,
  Text,
  Stack,
  FlexProps,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Search } from 'react-feather'
import VirtualizedList from './VirtualizedList'
import { Selection } from 'core/utils'
import { ChangeEvent, RefObject, useState } from 'react'
import { useFilterFoods, FoodsFilter } from 'core/foods'
import { Food } from 'core/types'
import { FoodCategoriesSelect } from 'components/foods'

const SearchStyled = chakra(Search)

type Props = {
  searchInputRef?: RefObject<HTMLInputElement>
  selection: Selection<Food>
} & FlexProps

function FoodsList({ selection, searchInputRef, ...rest }: Props) {
  const [filter, setFilter] = useState<FoodsFilter>({ query: '' })

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setFilter(filter => ({ ...filter, query: value }))
  }

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target
    setFilter(filter => ({ ...filter, categoryId: Number(value) }))
  }

  const filterFoods = useFilterFoods()
  const filteredFoods = filterFoods(filter)

  return (
    <Flex flexDirection="column" {...rest}>
      <Stack spacing={3} direction={{ base: 'column', md: 'row' }}>
        <InputGroup size="md" flex={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchStyled pointerEvents="none" color="gray.400" />}
          />
          <Input
            ref={searchInputRef}
            value={filter.query}
            onChange={onInputChange}
            placeholder="Search"
          />
        </InputGroup>

        <FoodCategoriesSelect flex={3} onChange={onSelectChange}>
          <option value={undefined}>All categories</option>
        </FoodCategoriesSelect>
      </Stack>

      <Divider mt={3} width="100%" />

      {filteredFoods.length > 0 ? (
        <VirtualizedList
          foodsCount={filteredFoods.length}
          isFoodSelected={food => selection.isIdSelected(food.id)}
          getFood={index => filteredFoods[index]}
          onFoodSelect={food => selection.onToggleItem(food)}
        />
      ) : (
        <Flex
          textColor="gray.400"
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <Text>No foods found</Text>
        </Flex>
      )}
    </Flex>
  )
}

export default FoodsList
