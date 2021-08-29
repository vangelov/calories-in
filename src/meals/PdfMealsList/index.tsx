import { View } from '@react-pdf/renderer'
import { MealForm } from 'meals/mealForm'
import PdfMealItem from './PdfMealItem'

type Props = {
  mealsForms: MealForm[]
}

function PdfMealsList({ mealsForms }: Props) {
  return (
    <View>
      {mealsForms.map((mealForm, index) => (
        <PdfMealItem
          style={{ marginTop: 20 }}
          key={mealForm.fieldId}
          mealForm={mealForm}
        />
      ))}
    </View>
  )
}

export default PdfMealsList
