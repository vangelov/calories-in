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
  ForwardedRef,
  RefObject,
  useRef,
  useImperativeHandle,
  forwardRef,
  ChangeEvent,
} from 'react'
import { useFilterFoods, useFoodsStoreState } from 'core/foods'
import { Food } from 'core/types'
import FilterPopover from './FilterPopover'
import { FixedSizeList } from 'react-window'
import useFoodsFilterStore from 'core/foods/filters/useFoodsFilterStore'

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
  const { allFoods, userFoods, indexOfFood } = useFoodsStoreState()
  const listRef = useRef<FixedSizeList>(null)
  const [filter, foodsFilterStoreMethods] = useFoodsFilterStore()
  const filteredFoods = useFilterFoods(allFoods, userFoods, filter)

  useImperativeHandle(forwardedRef, () => ({
    scrollToFood: (food: Food) => {
      foodsFilterStoreMethods.resetCategoryIdAndQuery()

      if (listRef.current) {
        const foods = filter.onlyFoodsAddedbyUser ? userFoods : allFoods
        const index = indexOfFood(food, foods)
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
            onFoodCategoryIdChange={foodsFilterStoreMethods.updateCategoryId}
            onOnlyFoodsAddedByUserChange={
              foodsFilterStoreMethods.updateOnlyFoodsAddedByUser
            }
            onReset={foodsFilterStoreMethods.resetFilter}
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
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              foodsFilterStoreMethods.updateQuery(event.target.value)
            }
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
