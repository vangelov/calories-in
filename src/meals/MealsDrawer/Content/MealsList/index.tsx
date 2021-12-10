import {
  Input,
  InputGroup,
  InputLeftElement,
  chakra,
  Flex,
  Text,
  FlexProps,
  VStack,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Search } from 'react-feather'
import VirtualizedList from './VirtualizedList'
import {
  ForwardedRef,
  RefObject,
  useRef,
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
import MealsCategoriesSelect from './MealsCategoriesSelect'
const SearchStyled = chakra(Search)

type FoodsListMethods = {
  scrollToFood: (food: Food) => void
}

type Props = {
  searchInputRef?: RefObject<HTMLInputElement>

  forwardedRef?: ForwardedRef<FoodsListMethods>
  allowsFiltering?: boolean
} & FlexProps

function MealsList({
  searchInputRef,

  forwardedRef,
  allowsFiltering = true,

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

  return (
    <Flex flexDirection="column" {...rest}>
      <VStack spacing={3}>
        <InputGroup size="md" flex={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchStyled pointerEvents="none" color="gray.400" />}
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
        <MealsCategoriesSelect />
      </VStack>

      <Divider mt={3} width="100%" />

      {filteredFoods.length > 0 ? (
        <VirtualizedList
          ref={listRef}
          foodsCount={filteredFoods.length}
          getFood={index => filteredFoods[index]}
          onFoodSelect={() => {}}
        />
      ) : (
        <Flex flex={1} alignItems="center" justifyContent="center">
          <Text textColor="gray.400">No foods found</Text>
        </Flex>
      )}
    </Flex>
  )
}

export type { FoodsListMethods }

export default forwardRef<any, Props>((props, ref) => (
  <MealsList {...props} forwardedRef={ref} />
))
