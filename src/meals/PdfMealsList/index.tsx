import { View } from '@react-pdf/renderer'
import { Food } from 'foods'
import { MealForm } from 'meals/mealForm'
import { StatsTree } from 'stats'
import PdfMealItem from './PdfMealItem'

type Props = {
  mealsForms: MealForm[]
  mealsFormsStatsTrees: StatsTree[]
  foodsById: Record<number, Food>
}

function PdfMealsList({ mealsForms, mealsFormsStatsTrees, foodsById }: Props) {
  return (
    <View>
      {mealsForms.map((mealForm, index) => {
        const { stats, subtrees } = mealsFormsStatsTrees[index]

        return (
          <PdfMealItem
            style={{ marginTop: 20 }}
            key={mealForm.fieldId}
            mealForm={mealForm}
            stats={stats}
            ingredientsFormsStats={subtrees.map(({ stats }) => stats)}
            foodsById={foodsById}
          />
        )
      })}
    </View>
  )
}

export default PdfMealsList
