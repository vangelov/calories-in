import { View } from '@react-pdf/renderer'
import { Food } from 'foods'
import { IngredientForm } from 'ingredients'
import { Stats } from 'stats'
import PdfIngredientItem from './PdfIngredientItem'

type Props = {
  ingredientsForms: IngredientForm[]
  ingredientsFormsStats: Stats[]
  foodsById: Record<number, Food>
}

function PdfIngredientsList({
  ingredientsForms,
  ingredientsFormsStats,
  foodsById,
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
            foodsById={foodsById}
          />
        )
      })}
    </View>
  )
}

export default PdfIngredientsList
