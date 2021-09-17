import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { Stats, StatsTree } from 'stats'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'
import { Style } from '@react-pdf/types/style'
import { VariantForm } from 'variants'
import { Food } from 'foods'
import { getComputedColorFromChakra } from 'theme'
import PdfMealsList from 'meals/PdfMealsList'

type Props = {
  name?: string
  variantForm: VariantForm
  stats: Stats
  mealsFormsStatsTrees: StatsTree[]
  style?: Style
  foodsById: Record<number, Food>
}

function PdfVariantItem({
  name,
  variantForm,
  stats,
  mealsFormsStatsTrees,
  foodsById,
  style = {},
}: Props) {
  const { mealsForms } = variantForm

  return (
    <View style={[style]}>
      <PdfStatsLayout
        nameElement={
          <Text
            style={[
              styles.name,
              { color: getComputedColorFromChakra('gray.600') },
            ]}
          >
            {name || variantForm.name}
          </Text>
        }
        energyElement={
          <PdfStat variant="dietEnergy" label="Energy" value={stats.energy} />
        }
        proteinElement={
          <PdfStat
            variant="diet"
            label="Protein"
            value={stats.protein}
            valueDetail="50%"
          />
        }
        carbsElement={
          <PdfStat
            variant="diet"
            label="Carbs"
            value={stats.carbs}
            valueDetail="50%"
          />
        }
        fatElement={
          <PdfStat
            variant="diet"
            label="Fat"
            value={stats.fat}
            valueDetail="50%"
          />
        }
      />

      <PdfMealsList
        mealsForms={mealsForms}
        mealsFormsStatsTrees={mealsFormsStatsTrees}
        foodsById={foodsById}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
    fontWeight: 'semibold',
  },
})

export default PdfVariantItem
