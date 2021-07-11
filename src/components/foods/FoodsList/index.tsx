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
import {
  ChangeEvent,
  ForwardedRef,
  RefObject,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { useFilterFoods, FoodsFilter, useFoodsStoreState } from 'core/foods'
import { Food } from 'core/types'
import FilterPopover from './FilterPopover'
import { FixedSizeList, VariableSizeList } from 'react-window'

const SearchStyled = chakra(Search)

type FoodsListMethods = {
  scrollToFood: (food: Food) => void
}

type Props = {
  searchInputRef?: RefObject<HTMLInputElement>
  selection: Selection<Food>
  onFoodPreview: (food: Food) => void
  forwardedRef?: ForwardedRef<FoodsListMethods>
} & FlexProps

function FoodsList({
  selection,
  searchInputRef,
  onFoodPreview,
  forwardedRef,
  ...rest
}: Props) {
  const [filter, setFilter] = useState<FoodsFilter>({ query: '' })
  const { foods, indexOfFood } = useFoodsStoreState()
  const filteredFoods = useFilterFoods(foods, filter)

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

  const listRef = useRef<VariableSizeList>(null)

  useImperativeHandle(forwardedRef, () => ({
    scrollToFood: (food: Food) => {
      if (listRef.current) {
        setFilter({ ...filter, categoryId: 0 })
        const index = indexOfFood(food)
        listRef.current.scrollToItem(index, 'center')
      }
    },
  }))

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
          ref={listRef}
          foodsCount={filteredFoods.length}
          isFoodSelected={food => selection.isIdSelected(food.id)}
          getFood={index => filteredFoods[index]}
          onFoodSelect={food => selection.onToggleItem(food)}
          onFoodPreview={onFoodPreview}
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

export type { FoodsListMethods }

export default forwardRef<any, Props>((props, ref) => (
  <FoodsList {...props} forwardedRef={ref} />
))
