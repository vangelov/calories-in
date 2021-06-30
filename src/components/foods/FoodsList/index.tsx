import {
  Input,
  InputGroup,
  InputLeftElement,
  chakra,
  Flex,
  Text,
  FlexProps,
  HStack,
  Box,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Search } from 'react-feather'
import VirtualizedList from './VirtualizedList'
import { Selection } from 'general/useSelection'
import { ChangeEvent, RefObject, useState } from 'react'
import { useFilterFoods, FoodsFilter } from 'core/foods'
import { Food } from 'core/types'
import FilterPopover from './FilterPopover'

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

  function onFoodCategoryIdChange(categoryId: number) {
    setFilter({ ...filter, categoryId })
  }

  function onOnlyFoodsAddedByUserChange(onlyFoodsAddedbyUser: boolean) {
    setFilter({ ...filter, onlyFoodsAddedbyUser })
  }

  const filteredFoods = useFilterFoods(filter)

  return (
    <Flex flexDirection="column" {...rest}>
      <HStack spacing={3}>
        <Box>
          <FilterPopover
            filter={filter}
            onFoodCategoryIdChange={onFoodCategoryIdChange}
            onOnlyFoodsAddedByUserChange={onOnlyFoodsAddedByUserChange}
            onReset={() => {}}
          />
        </Box>

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
      </HStack>

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
