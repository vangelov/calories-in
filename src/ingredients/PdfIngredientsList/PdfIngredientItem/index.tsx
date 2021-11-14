import { StyleSheet, View } from '@react-pdf/renderer'
import { Food, FoodId } from 'foods'
import { IngredientForm } from 'ingredients'
import { Portion } from 'portions'
import { Stats } from 'stats'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'
import FoodName from './FoodName'

type Props = {
  ingredientForm: IngredientForm
  stats: Stats
  foodsById: Record<FoodId, Food>
  portionsById: Record<string, Portion>
}

function PdfIngredientItem({
  ingredientForm,
  stats,
  foodsById,
  portionsById,
}: Props) {
  return (
    <View style={styles.root}>
      <PdfStatsLayout
        nameElement={
          <FoodName
            ingredientForm={ingredientForm}
            foodsById={foodsById}
            portionsById={portionsById}
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
    fontSize: 14,
  },
  notes: {
    marginTop: 3,
    fontSize: 12,
  },
})

export default PdfIngredientItem
