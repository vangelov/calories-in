import { View } from '@react-pdf/renderer'
import { MealForm } from 'meals/mealForm'
import { StatsTree, Stats } from 'stats'
import PdfMealItem from './PdfMealItem'

type Props = {
  mealsForms: MealForm[]
  mealsFormsStatsTrees: StatsTree[]
}

function PdfMealsList({ mealsForms, mealsFormsStatsTrees }: Props) {
  return (
    <View>
      {mealsForms.map((mealForm, index) => {
        const { sum, parts } = mealsFormsStatsTrees[index]

        return (
          <PdfMealItem
            style={{ marginTop: 20 }}
            key={mealForm.fieldId}
            mealForm={mealForm}
            stats={sum}
            ingredientsFormsStats={parts as Stats[]}
          />
        )
      })}
    </View>
  )
}

export default PdfMealsList
