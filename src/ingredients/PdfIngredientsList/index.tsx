import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { Food, FoodId } from 'foods'
import { IngredientForm } from 'ingredients'
import { Portion } from 'portions'
import { Stats } from 'stats'
import getComputedColorFromChakra from 'theme/getComputedColorFromChakra'
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
            isLast={index === filteredIngredientsForms.length - 1}
          />
        )
      })}
      {ingredientsForms.length === 0 && (
        <Text
          style={[
            styles.emptyListText,
            {
              color: getComputedColorFromChakra('gray.500'),
            },
          ]}
        >
          You haven't added any foods
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  emptyListText: {
    backgroundColor: 'white',
    padding: 12,
    fontSize: 14,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
})

export default PdfIngredientsList
