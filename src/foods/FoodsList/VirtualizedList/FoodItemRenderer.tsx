import { Food } from 'foods'
import FoodItem, { UsageType } from './FoodItem'
import { TOP_PADDING } from './Inner'

type Data = {
  getFood: (index: number) => Food
  isFoodSelected: (food: Food) => boolean
  onFoodSelect: (food: Food) => void
  onFoodPreview: (food: Food) => void
  usageType: UsageType
}

type Props = {
  style: any
  index: number
  data: Data
}

function FoodItemRenderer({ style, index, data }: Props) {
  const {
    getFood,
    onFoodSelect,
    onFoodPreview,
    isFoodSelected,
    usageType,
  } = data
  const food = getFood(index)

  return (
    <FoodItem
      key={food.id}
      style={{
        ...style,
        top: `${parseFloat(style['top'] as string) + TOP_PADDING}px`,
      }}
      onChoose={onFoodSelect}
      isSelected={isFoodSelected(food)}
      onPreview={onFoodPreview}
      food={food}
      usageType={usageType}
    />
  )
}

export default FoodItemRenderer
