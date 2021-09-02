import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { IngredientForm } from 'ingredients'
import { PdfStat, PdfStatsLayout, Stats } from 'stats'

type Props = {
  ingredientForm: IngredientForm
  stats: Stats
}

function PdfIngredientItem({ ingredientForm, stats }: Props) {
  return (
    <View style={styles.root}>
      <PdfStatsLayout
        nameElement={<Text style={styles.name}>{ingredientForm.foodId}</Text>}
        amountElement={
          <PdfStat
            variant="ingredient"
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
    fontSize: 14,
    marginLeft: 10,
  },
})

export default PdfIngredientItem
