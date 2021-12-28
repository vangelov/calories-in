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
import { Selection } from 'general'
import {
  ForwardedRef,
  RefObject,
  useRef,
  useImperativeHandle,
  forwardRef,
  ChangeEvent,
  useEffect,
} from 'react'
import { useFoods } from 'foods'
import {
  useFilterFoods,
  useFoodsFilter,
  useFoodsFilterActions,
} from 'foods-filters'
import { Food } from 'foods'
import { FixedSizeList } from 'react-window'
import { FoodsFilterPopoverOrModal } from 'foods-filters'
import { UsageType } from './VirtualizedList/FoodItem'
import { isMobile } from 'react-device-detect'

const SearchStyled = chakra(Search)

type FoodsListMethods = {
  scrollToFood: (food: Food) => void
}

type Props = {
  searchInputRef?: RefObject<HTMLInputElement>
  selection?: Selection<Food>
  onFoodPreview?: (food: Food) => void
  forwardedRef?: ForwardedRef<FoodsListMethods>
  allowsFiltering?: boolean
  itemUsageType?: UsageType
} & FlexProps

function FoodsList({
  selection,
  searchInputRef,
  onFoodPreview,
  forwardedRef,
  allowsFiltering = true,
  itemUsageType = 'selectOrPreview',
  ...rest
}: Props) {
  const { allFoods, userFoods } = useFoods()
  const listRef = useRef<FixedSizeList>(null)

  const filter = useFoodsFilter()
  const foodsFilterActions = useFoodsFilterActions()
  const filteredFoods = useFilterFoods(allFoods, userFoods, filter)

  useEffect(() => {
    if (filter.categoryId) {
      listRef.current?.scrollToItem(0, 'start')
    }
  }, [filter.categoryId])

  useImperativeHandle(forwardedRef, () => ({
    scrollToFood: (food: Food) => {
      foodsFilterActions.resetCategoryIdAndQuery()

      if (listRef.current) {
        const foods = filter.onlyFoodsAddedByUser ? userFoods : allFoods
        const index = foods.map(({ id }) => id).indexOf(food.id)
        listRef.current.scrollToItem(index, 'center')
      }
    },
  }))

  function onFoodSelect(food: Food) {
    if (selection) {
      selection.toggleItem(food)
      const input = searchInputRef?.current

      if (input && !isMobile) {
        input.focus()
        input.setSelectionRange(0, input.value.length)
      }
    }
  }

  return (
    <Flex flexDirection="column" {...rest}>
      <HStack spacing={3}>
        {allowsFiltering && (
          <Box>
            <FoodsFilterPopoverOrModal />
          </Box>
        )}

        <InputGroup size="md" flex={4}>
          <InputLeftElement
            pointerEvents="none"
            children={
              <SearchStyled pointerEvents="none" size={20} color="gray.400" />
            }
          />
          <Input
            ref={searchInputRef}
            value={filter.query}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              foodsFilterActions.updateFilter({ query: event.target.value })
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
          isFoodSelected={food =>
            selection ? selection.isIdSelected(food.id) : false
          }
          getFood={index => filteredFoods[index]}
          onFoodSelect={onFoodSelect}
          onFoodPreview={onFoodPreview || (() => {})}
          itemUsageType={itemUsageType}
        />
      ) : (
        <Flex flex={1} alignItems="center" justifyContent="center">
          <Text textColor="gray.500">No foods found</Text>
        </Flex>
      )}
    </Flex>
  )
}

export type { FoodsListMethods }

export default forwardRef<any, Props>((props, ref) => (
  <FoodsList {...props} forwardedRef={ref} />
))
