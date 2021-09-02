import { View } from '@react-pdf/renderer'
import { IngredientForm } from 'ingredients'
import { Stats } from 'stats'
import PdfIngredientItem from './PdfIngredientItem'

type Props = {
  ingredientsForms: IngredientForm[]
  ingredientsFormsStats: Stats[]
}

function PdfIngredientsList({
  ingredientsForms,
  ingredientsFormsStats,
}: Props) {
  return (
    <View>
      {ingredientsForms.map((ingredientForm, index) => {
        const stats = ingredientsFormsStats[index]

        return (
          <PdfIngredientItem
            key={ingredientForm.fieldId}
            ingredientForm={ingredientForm}
            stats={stats}
          />
        )
      })}
    </View>
  )
}

export default PdfIngredientsList
