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
import { RefObject, useRef } from 'react'
import { FixedSizeList } from 'react-window'
import MealsCategoriesSelect from './MealsCategoriesSelect'
import { Recipe, useRecipes } from 'recipes'

const SearchStyled = chakra(Search)

type Props = {
  searchInputRef?: RefObject<HTMLInputElement>
  onRecipeSelect: (recipe: Recipe) => void
  allowsFiltering?: boolean
} & FlexProps

function RecipesList({
  searchInputRef,
  onRecipeSelect,
  allowsFiltering = true,

  ...rest
}: Props) {
  const { recipes } = useRecipes()
  const listRef = useRef<FixedSizeList>(null)

  /*useEffect(() => { 
    if (filter.categoryId) {
      listRef.current?.scrollToItem(0, 'start')
    }
  }, [filter.categoryId])*/

  return (
    <Flex flexDirection="column" {...rest}>
      <VStack spacing={3}>
        <InputGroup size="md" flex={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchStyled pointerEvents="none" color="gray.400" />}
          />
          <Input ref={searchInputRef} placeholder="Search" />
        </InputGroup>
        <MealsCategoriesSelect />
      </VStack>

      <Divider mt={3} width="100%" />

      {recipes.length > 0 ? (
        <VirtualizedList
          ref={listRef}
          recipesCount={recipes.length}
          getRecipe={index => recipes[index]}
          onRecipeSelect={onRecipeSelect}
        />
      ) : (
        <Flex flex={1} alignItems="center" justifyContent="center">
          <Text textColor="gray.400">No foods found</Text>
        </Flex>
      )}
    </Flex>
  )
}

export default RecipesList
