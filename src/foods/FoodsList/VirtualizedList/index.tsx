import { Box } from '@chakra-ui/react'
import { FixedSizeList } from 'react-window'
import { forwardRef, ForwardedRef } from 'react'
import { Food } from 'foods'
import Inner from './Inner'
import FoodItemRenderer from './FoodItemRenderer'
import { UsageType } from './FoodItem'
import { useElementHeight } from 'general'

type Props = {
  foodsCount: number
  getFood: (index: number) => Food
  isFoodSelected: (food: Food) => boolean
  onFoodSelect: (food: Food) => void
  onFoodPreview: (food: Food) => void
  forwardRef?: ForwardedRef<FixedSizeList>
  itemUsageType: UsageType
}

function VirtualizedList({
  getFood,
  isFoodSelected,
  onFoodSelect,
  onFoodPreview,
  foodsCount,
  forwardRef,
  itemUsageType,
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
          onFoodPreview,
          isFoodSelected,
          usageType: itemUsageType,
        }}
        itemSize={72}
        width="100%"
        ref={forwardRef}
      >
        {FoodItemRenderer}
      </FixedSizeList>
    </Box>
  )
}

export default forwardRef<FixedSizeList, Props>((props, ref) => (
  <VirtualizedList {...props} forwardRef={ref} />
))
