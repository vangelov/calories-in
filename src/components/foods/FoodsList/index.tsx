import {
  Input,
  InputGroup,
  InputLeftElement,
  chakra,
  Flex,
  Text,
  FlexProps,
  Button,
  Checkbox,
  IconButton,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Search } from 'react-feather'
import VirtualizedList from './VirtualizedList'
import { Selection } from 'general/useSelection'
import { ChangeEvent, RefObject, useRef, useState } from 'react'
import { useFilterFoods, FoodsFilter } from 'core/foods'
import { Food } from 'core/types'
import { FoodCategoriesSelect } from 'components/foods'
import { Filter } from 'react-feather'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'

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

  const filteredFoods = useFilterFoods(filter)

  const testRef = useRef<HTMLSelectElement>(null)

  return (
    <Flex flexDirection="column" {...rest}>
      <HStack spacing={3}>
        <Popover placement="left" initialFocusRef={testRef}>
          <PopoverTrigger>
            <IconButton
              size="md"
              aria-label="Add variant"
              icon={<Filter size={20} pointerEvents="none" />}
              variant="outline"
            />
          </PopoverTrigger>
          <PopoverContent boxShadow="lg">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Filters</PopoverHeader>
            <PopoverBody>
              <VStack spacing={3} p={1} alignItems="flex-start">
                <FoodCategoriesSelect
                  ref={testRef}
                  flex={3}
                  onChange={onSelectChange}
                >
                  <option value={undefined}>All categories</option>
                </FoodCategoriesSelect>

                <Checkbox colorScheme="teal">Only items added by me</Checkbox>
              </VStack>
            </PopoverBody>
            <PopoverFooter border="0">
              <HStack spacing={3} justifyContent="flex-end">
                <Button variant="link">Reset</Button>
                <Button variant="outline">Cose</Button>
              </HStack>
            </PopoverFooter>
          </PopoverContent>
        </Popover>

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
