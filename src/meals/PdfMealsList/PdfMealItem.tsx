import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { MealForm } from 'meals'
import { Style } from '@react-pdf/types/style'
import { getComputedColorFromChakra } from 'theme'
import { Stats } from 'stats'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'
import { Food } from 'foods'
import PdfIngredientsList from 'ingredients/PdfIngredientsList'

type Props = {
  mealForm: MealForm
  style?: Style
  stats: Stats
  ingredientsFormsStats: Stats[]
  foodsById: Record<number, Food>
}

function PdfMealItem({
  mealForm,
  stats,
  ingredientsFormsStats,
  style = {},
  foodsById,
}: Props) {
  const { ingredientsForms } = mealForm

  return (
    <View
      style={[
        styles.root,
        style,
        { borderColor: getComputedColorFromChakra('gray.200') },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: getComputedColorFromChakra('gray.50'),
            borderBottomColor: getComputedColorFromChakra('gray.200'),
          },
        ]}
      >
        <PdfStatsLayout
          nameElement={
            <Text
              style={[
                styles.name,
                {
                  color: getComputedColorFromChakra(
                    mealForm.name ? 'gray.600' : 'gray.400'
                  ),
                },
              ]}
            >
              {mealForm.name || 'No name provided'}
            </Text>
          }
          amountElement={
            <PdfStat
              variant="meal"
              label="Amount"
              value={stats.amountInGrams}
            />
          }
          energyElement={
            <PdfStat variant="mealEnergy" label="Energy" value={stats.energy} />
          }
          proteinElement={
            <PdfStat variant="meal" label="Protein" value={stats.protein} />
          }
          carbsElement={
            <PdfStat variant="meal" label="Carbs" value={stats.carbs} />
          }
          fatElement={<PdfStat variant="meal" label="Fat" value={stats.fat} />}
        />
      </View>
      <PdfIngredientsList
        ingredientsForms={ingredientsForms}
        ingredientsFormsStats={ingredientsFormsStats}
        foodsById={foodsById}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderRadius: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: 'medium',
    marginLeft: 10,
  },
  header: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
})

export default PdfMealItem
