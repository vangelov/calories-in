import { View } from '@react-pdf/renderer'
import { Food } from 'foods'
import { MealForm } from 'meals/mealForm'
import { Portion } from 'portions'
import { StatsTree } from 'stats'
import PdfMealItem from './PdfMealItem'

type Props = {
  mealsForms: MealForm[]
  mealsFormsStatsTrees: StatsTree[]
  foodsById: Record<number, Food>
  portionsById: Record<string, Portion>
}

function PdfMealsList({
  mealsForms,
  mealsFormsStatsTrees,
  foodsById,
  portionsById,
}: Props) {
  return (
    <View>
      {mealsForms.map((mealForm, index) => {
        const { stats, subtrees } = mealsFormsStatsTrees[index]

        return (
          <PdfMealItem
            style={{ marginTop: 12 }}
            key={mealForm.fieldId}
            mealForm={mealForm}
            stats={stats}
            ingredientsFormsStats={subtrees.map(({ stats }) => stats)}
            foodsById={foodsById}
            portionsById={portionsById}
          />
        )
      })}
    </View>
  )
}

export default PdfMealsList
