import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { Food, FoodId } from 'foods'
import { IngredientForm } from 'ingredients'
import { Portion } from 'portions'
import { Stats } from 'stats'
import { getComputedColorFromChakra } from 'theme'
import PdfIngredientItem from './PdfIngredientItem'

type Props = {
  ingredientsForms: IngredientForm[]
  ingredientsFormsStats: Stats[]
  foodsById: Record<FoodId, Food>
  portionsById: Record<string, Portion>
}

function PdfIngredientsList({
  ingredientsForms,
  ingredientsFormsStats,
  foodsById,
  portionsById,
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
            portionsById={portionsById}
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
          No foods added yet
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  emptyListText: {
    padding: 10,
    fontSize: 12,
  },
})

export default PdfIngredientsList
