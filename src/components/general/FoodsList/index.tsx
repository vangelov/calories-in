import {
  Input,
  InputGroup,
  InputLeftElement,
  chakra,
  Flex,
  Select,
  Text,
  VStack,
  FlexProps,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Search } from 'react-feather'
import VirtualizedList from './VirtualizedList'
import { Selection } from 'core/utils'
import { ChangeEvent, useState } from 'react'
import { FOODS_CATEGORIES } from 'core/foodsCategories'
import { useFilterFoods, FoodsFilter } from 'core/foods'
import { Food } from 'core/types'

const SearchStyled = chakra(Search)

type Props = {
  selection: Selection<Food>
} & FlexProps

function FoodsList({ selection, ...rest }: Props) {
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
      <VStack spacing={3}>
        <InputGroup size="lg">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchStyled pointerEvents="none" color="gray.400" />}
          />
          <Input
            value={filter.query}
            onChange={onInputChange}
            autoFocus={true}
            placeholder="Search"
          />
        </InputGroup>

        <Select
          onChange={onSelectChange}
          focusBorderColor="custom.500"
          size="lg"
          flex={1}
          colorScheme="red"
        >
          <option value={undefined}>All categories</option>
          {FOODS_CATEGORIES.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </VStack>

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
