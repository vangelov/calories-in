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
  useEffect,
} from 'react'
import {
  useFilterFoods,
  FoodsFilter,
  useFoodsStoreState,
  useFoodsFilterStoreMethods,
  DEFAULT_FILTER,
} from 'core/foods'
import { Food } from 'core/types'
import FilterPopover from './FilterPopover'
import { FixedSizeList } from 'react-window'

const SearchStyled = chakra(Search)

type FoodsListMethods = {
  scrollToFood: (food: Food) => void
}

type Props = {
  searchInputRef?: RefObject<HTMLInputElement>
  selection: Selection<Food>
  onFoodPreview: (food: Food) => void
  forwardedRef?: ForwardedRef<FoodsListMethods>
  initialFilter: FoodsFilter
} & FlexProps

function FoodsList({
  selection,
  searchInputRef,
  onFoodPreview,
  forwardedRef,
  initialFilter,
  ...rest
}: Props) {
  const [filter, setFilter] = useState<FoodsFilter>(initialFilter)
  const { allFoods, userFoods, indexOfFood } = useFoodsStoreState()
  const filteredFoods = useFilterFoods(allFoods, userFoods, filter)
  const foodsFilterStoreMethods = useFoodsFilterStoreMethods()

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

  function onReset() {
    setFilter({ ...DEFAULT_FILTER })
  }

  const listRef = useRef<FixedSizeList>(null)

  useImperativeHandle(forwardedRef, () => ({
    scrollToFood: (food: Food) => {
      setFilter({ ...filter, query: '', categoryId: 0 })

      if (listRef.current) {
        const foods = filter.onlyFoodsAddedbyUser ? userFoods : allFoods
        const index = indexOfFood(food, foods)
        listRef.current.scrollToItem(index, 'center')
      }
    },
  }))

  useEffect(() => {
    foodsFilterStoreMethods.saveFilter(filter)
  }, [filter, foodsFilterStoreMethods])

  return (
    <Flex flexDirection="column" {...rest}>
      <HStack spacing={3}>
        <Box>
          <FilterPopover
            filter={filter}
            onFoodCategoryIdChange={onFoodCategoryIdChange}
            onOnlyFoodsAddedByUserChange={onOnlyFoodsAddedByUserChange}
            onReset={onReset}
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
