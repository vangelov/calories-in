import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { PdfStat, Stats, StatsTree, PdfStatsLayout } from 'stats'
import { Style } from '@react-pdf/types/style'
import { PdfMealsList } from 'meals'
import { VariantForm } from 'variants'

type Props = {
  variantForm: VariantForm
  stats: Stats
  mealsFormsStatsTrees: StatsTree[]
  style?: Style
}

function PdfVariantItem({
  variantForm,
  stats,
  mealsFormsStatsTrees,
  style = {},
}: Props) {
  const { mealsForms } = variantForm

  return (
    <View style={[style]}>
      <PdfStatsLayout
        nameElement={<Text style={styles.name}>Variant Name</Text>}
        energyElement={
          <PdfStat variant="dietEnergy" label="Energy" value={stats.energy} />
        }
        proteinElement={
          <PdfStat variant="diet" label="Protein" value={stats.protein} />
        }
        carbsElement={
          <PdfStat variant="diet" label="Carbs" value={stats.carbs} />
        }
        fatElement={<PdfStat variant="diet" label="Fat" value={stats.fat} />}
      />

      <PdfMealsList
        mealsForms={mealsForms}
        mealsFormsStatsTrees={mealsFormsStatsTrees}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
  },
})

export default PdfVariantItem
