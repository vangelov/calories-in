import { Box } from '@chakra-ui/react'
import { FixedSizeList } from 'react-window'
import { forwardRef, ForwardedRef } from 'react'
import { Food } from 'foods'
import Inner from './Inner'
import MealItemRenderer from './MealItemRenderer'
import { useElementHeight } from 'general'

type Props = {
  foodsCount: number
  getFood: (index: number) => Food
  onFoodSelect: (food: Food) => void
  forwardRef?: ForwardedRef<FixedSizeList>
}

function VirtualizedList({
  getFood,
  onFoodSelect,
  foodsCount,
  forwardRef,
}: Props) {
  const { elementHeight, elementRef } = useElementHeight()

  return (
    <Box position="relative" ref={elementRef} flex={1}>
      <FixedSizeList
        style={{ position: 'absolute', top: 0 }}
        innerElementType={Inner}
        height={elementHeight}
        itemCount={foodsCount}
        itemData={{
          getFood,
          onFoodSelect,
        }}
        itemSize={105}
        width="100%"
        ref={forwardRef}
      >
        {MealItemRenderer}
      </FixedSizeList>
    </Box>
  )
}

export default forwardRef<FixedSizeList, Props>((props, ref) => (
  <VirtualizedList {...props} forwardRef={ref} />
))
