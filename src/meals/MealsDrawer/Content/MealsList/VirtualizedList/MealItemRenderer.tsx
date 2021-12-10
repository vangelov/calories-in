import { Food } from 'foods'
import MealItem from './MealItem'
import { TOP_PADDING } from './Inner'

type Data = {
  getFood: (index: number) => Food

  onFoodSelect: (food: Food) => void
}

type Props = {
  style: any
  index: number
  data: Data
}

function MealItemRenderer({ style, index, data }: Props) {
  const { getFood, onFoodSelect } = data
  const food = getFood(index)

  return (
    <MealItem
      key={food.id}
      style={{
        ...style,
        top: `${parseFloat(style['top'] as string) + TOP_PADDING}px`,
      }}
      onChoose={onFoodSelect}
      food={food}
    />
  )
}

export default MealItemRenderer
