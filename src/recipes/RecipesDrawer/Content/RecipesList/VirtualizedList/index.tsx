import { Box } from '@chakra-ui/react'
import { FixedSizeList } from 'react-window'
import { forwardRef, ForwardedRef } from 'react'
import Inner from './Inner'
import RecipeItemRenderer from './RecipeItemRenderer'
import { useElementHeight } from 'general'
import { Recipe } from 'recipes'

type Props = {
  recipesCount: number
  getRecipe: (index: number) => Recipe
  onRecipeSelect: (recipe: Recipe) => void
  forwardRef?: ForwardedRef<FixedSizeList>
}

function VirtualizedList({
  getRecipe,
  onRecipeSelect,
  recipesCount,
  forwardRef,
}: Props) {
  const { elementHeight, elementRef } = useElementHeight()

  return (
    <Box position="relative" ref={elementRef} flex={1}>
      <FixedSizeList
        style={{ position: 'absolute', top: 0 }}
        innerElementType={Inner}
        height={elementHeight}
        itemCount={recipesCount}
        itemData={{
          getRecipe,
          onRecipeSelect,
        }}
        itemSize={105}
        width="100%"
        ref={forwardRef}
      >
        {RecipeItemRenderer}
      </FixedSizeList>
    </Box>
  )
}

export default forwardRef<FixedSizeList, Props>((props, ref) => (
  <VirtualizedList {...props} forwardRef={ref} />
))
