import { Box } from '@chakra-ui/react'
import { FixedSizeList } from 'react-window'
import FoodItem from './FoodItem'
import useResizeObserver from '@react-hook/resize-observer'
import { forwardRef, useRef, useState } from 'react'
import { Food } from 'core/types'

const TOP_PADDING = 12

const Inner = forwardRef<any, any>(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      height: `${parseFloat(style.height) + TOP_PADDING}px`,
    }}
    {...rest}
  />
))

type Props = {
  foodsCount: number
  getFood: (index: number) => Food
  isFoodSelected: (food: Food) => boolean
  onFoodSelect: (food: Food) => void
  onFoodPreview: (food: Food) => void
}

function VirtualizedList({
  getFood,
  isFoodSelected,
  onFoodSelect,
  onFoodPreview,
  foodsCount,
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
        itemSize={72}
        width="100%"
      >
        {({ style, index }: any) => {
          const food = getFood(index)

          return (
            <FoodItem
              style={{
                ...style,
                top: `${parseFloat(style.top) + TOP_PADDING}px`,
              }}
              onClick={() => onFoodSelect(food)}
              isSelected={isFoodSelected(food)}
              onPreview={() => onFoodPreview(food)}
              food={food}
            />
          )
        }}
      </FixedSizeList>
    </Box>
  )
}

export default VirtualizedList
