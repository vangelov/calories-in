import { Box } from '@chakra-ui/react'
import { FixedSizeList } from 'react-window'
import useResizeObserver from '@react-hook/resize-observer'
import { forwardRef, useRef, useState, ForwardedRef } from 'react'
import { Food } from 'core/types'
import Inner from './Inner'
import FoodItemRenderer from './FoodItemRenderer'

type Props = {
  foodsCount: number
  getFood: (index: number) => Food
  isFoodSelected: (food: Food) => boolean
  onFoodSelect: (food: Food) => void
  onFoodPreview: (food: Food) => void
  forwardRef?: ForwardedRef<FixedSizeList>
}

function VirtualizedList({
  getFood,
  isFoodSelected,
  onFoodSelect,
  onFoodPreview,
  foodsCount,
  forwardRef,
}: Props) {
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useResizeObserver(ref, entry => setHeight(entry.contentRect.height))

  return (
    <Box position="relative" ref={ref} flex={1}>
      <FixedSizeList
        style={{ position: 'absolute', top: 0 }}
        innerElementType={Inner}
        height={height}
        itemCount={foodsCount}
        itemData={{ getFood, onFoodSelect, onFoodPreview, isFoodSelected }}
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
