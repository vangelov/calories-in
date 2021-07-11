import { Box } from '@chakra-ui/react'
import { FixedSizeList, VariableSizeList } from 'react-window'
import useResizeObserver from '@react-hook/resize-observer'
import { forwardRef, useRef, useState, ForwardedRef, useEffect } from 'react'
import { Food } from 'core/types'
import Inner from './Inner'
import FoodItemRenderer from './FoodItemRenderer'
import { setSyntheticTrailingComments } from 'typescript'

type Props = {
  foodsCount: number
  getFood: (index: number) => Food
  isFoodSelected: (food: Food) => boolean
  onFoodSelect: (food: Food) => void
  onFoodPreview: (food: Food) => void
  forwardRef?: ForwardedRef<VariableSizeList>
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
  const [test, setTest] = useState(0)

  const t = useRef<any>(null)

  useResizeObserver(ref, entry => setHeight(entry.contentRect.height))

  useEffect(() => {
    setTimeout(() => {
      setTest(72)
      t.current.resetAfterIndex(0)
    }, 2000)
  }, [])

  return (
    <Box position="relative" ref={ref} flex={1}>
      <VariableSizeList
        style={{ position: 'absolute', top: 0 }}
        innerElementType={Inner}
        height={height}
        itemCount={foodsCount}
        itemData={{ getFood, onFoodSelect, onFoodPreview, isFoodSelected }}
        itemSize={index => (index === 0 ? test : 72)}
        width="100%"
        ref={t}
      >
        {FoodItemRenderer}
      </VariableSizeList>
    </Box>
  )
}

export default forwardRef<VariableSizeList, Props>((props, ref) => (
  <VirtualizedList {...props} forwardRef={ref} />
))
