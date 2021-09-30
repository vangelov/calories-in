import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { Food, FoodId } from 'foods'
import { IngredientForm } from 'ingredients'
import { Stats } from 'stats'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'
import { getComputedColorFromChakra } from 'theme'

type Props = {
  ingredientForm: IngredientForm
  stats: Stats
  foodsById: Record<FoodId, Food>
}

function PdfIngredientItem({ ingredientForm, stats, foodsById }: Props) {
  const food = foodsById[ingredientForm.foodId]

  return (
    <View style={styles.root}>
      <PdfStatsLayout
        nameElement={
          <Text
            style={[
              styles.name,
              { color: getComputedColorFromChakra('gray.600') },
            ]}
          >
            {food.name}
          </Text>
        }
        amountElement={
          <PdfStat
            variant="ingredientAmount"
            value={Number(ingredientForm.amountInGrams)}
          />
        }
        energyElement={
          <PdfStat variant="ingredientEnergy" value={stats.energy} />
        }
        proteinElement={<PdfStat variant="ingredient" value={stats.protein} />}
        carbsElement={<PdfStat variant="ingredient" value={stats.carbs} />}
        fatElement={<PdfStat variant="ingredient" value={stats.fat} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: { paddingTop: 10, paddingBottom: 10 },
  name: {
    fontSize: 12,
    marginLeft: 10,
  },
})

export default PdfIngredientItem
