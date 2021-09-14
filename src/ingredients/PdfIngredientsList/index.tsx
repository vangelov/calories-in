import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { Food } from 'foods'
import { IngredientForm } from 'ingredients'
import { Stats } from 'stats'
import { getComputedColorFromChakra } from 'theme'
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
  const filteredIngredientsForms = ingredientsForms.filter(
    ({ foodId }) => foodsById[foodId]
  )

  return (
    <View>
      {filteredIngredientsForms.map((ingredientForm, index) => {
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
      {ingredientsForms.length === 0 && (
        <Text
          style={[
            styles.emptyListText,
            {
              color: getComputedColorFromChakra('gray.400'),
            },
          ]}
        >
          No foods added
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  emptyListText: {
    padding: 10,
    fontSize: 14,
  },
})

export default PdfIngredientsList
