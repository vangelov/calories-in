import { Food } from 'foods'
import FoodItem from './FoodItem'
import { TOP_PADDING } from './Inner'

type Data = {
  getFood: (index: number) => Food
  isFoodSelected: (food: Food) => boolean
  onFoodSelect: (food: Food) => void
  onFoodPreview: (food: Food) => void
}

type Props = {
  style: any
  index: number
  data: Data
}

function FoodItemRenderer({ style, index, data }: Props) {
  const { getFood, onFoodSelect, onFoodPreview, isFoodSelected } = data
  const food = getFood(index)

  return (
    <FoodItem
      key={food.id}
      style={{
        ...style,
        top: `${parseFloat(style['top'] as string) + TOP_PADDING}px`,
      }}
      onClick={() => onFoodSelect(food)}
      isSelected={isFoodSelected(food)}
      onPreview={() => onFoodPreview(food)}
      food={food}
    />
  )
}

export default FoodItemRenderer
