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
  isLast: boolean
}

function PdfIngredientItem({
  ingredientForm,
  stats,
  foodsById,
  portionsById,
  isLast,
}: Props) {
  return (
    <View
      style={[
        styles.root,
        isLast ? { borderBottomLeftRadius: 7, borderBottomRightRadius: 7 } : {},
      ]}
    >
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
  root: { paddingTop: 12, paddingBottom: 12, backgroundColor: 'white' },
  name: {
    fontSize: 14,
  },
})

export default PdfIngredientItem
