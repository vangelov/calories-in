import { View } from '@react-pdf/renderer'
import { IngredientForm } from 'ingredients/ingredientForm'
import PdfIngredientItem from './PdfIngredientItem'

type Props = {
  ingredientsForms: IngredientForm[]
}

function PdfIngredientsList({ ingredientsForms }: Props) {
  return (
    <View>
      {ingredientsForms.map(ingredientForm => (
        <PdfIngredientItem
          key={ingredientForm.fieldId}
          ingredientForm={ingredientForm}
        />
      ))}
    </View>
  )
}

export default PdfIngredientsList
