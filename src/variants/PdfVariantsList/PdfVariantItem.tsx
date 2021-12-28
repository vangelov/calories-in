import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { Stats, StatsTree } from 'stats'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'
import { VariantForm } from 'variants'
import { Food } from 'foods'
import getComputedColorFromChakra from 'theme/getComputedColorFromChakra'
import PdfMealsList from 'meals/PdfMealsList'
import { useMemo } from 'react'
import { Portion } from 'portions'
import getMacrosPercents from 'stats/calculations/getMacrosPercents'
import roundMacrosPercents from 'stats/calculations/roundMacrosPercents'

type Props = {
  variantForm: VariantForm
  stats: Stats
  mealsFormsStatsTrees: StatsTree[]
  foodsById: Record<number, Food>
  portionsById: Record<string, Portion>
  index: number
}

function PdfVariantItem({
  variantForm,
  stats,
  mealsFormsStatsTrees,
  foodsById,
  portionsById,
  index,
}: Props) {
  const { mealsForms } = variantForm

  const { proteinPercent, carbsPercent, fatPercent } = useMemo(
    () => roundMacrosPercents(getMacrosPercents(stats)),
    [stats]
  )

  return (
    <View style={styles.root} break={index > 0}>
      <PdfStatsLayout
        nameElement={
          <Text
            style={[
              styles.name,
              {
                color: variantForm.name
                  ? getComputedColorFromChakra('teal.600')
                  : getComputedColorFromChakra('gray.400'),
              },
            ]}
          >
            {variantForm.name || 'Untitled variant'}
          </Text>
        }
        energyElement={
          <PdfStat variant="dietEnergy" label="Calories" value={stats.energy} />
        }
        proteinElement={
          <PdfStat
            variant="diet"
            label="Protein"
            value={stats.protein}
            valueDetail={`${proteinPercent}%`}
          />
        }
        carbsElement={
          <PdfStat
            variant="diet"
            label="Carbs"
            value={stats.carbs}
            valueDetail={`${carbsPercent}%`}
          />
        }
        fatElement={
          <PdfStat
            variant="diet"
            label="Fat"
            value={stats.fat}
            valueDetail={`${fatPercent}%`}
          />
        }
      />

      <View
        style={[
          { backgroundColor: getComputedColorFromChakra('gray.100') },
          styles.separator,
        ]}
      />

      <PdfMealsList
        mealsForms={mealsForms}
        mealsFormsStatsTrees={mealsFormsStatsTrees}
        foodsById={foodsById}
        portionsById={portionsById}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  name: {
    fontWeight: 'semibold',
    fontSize: 20,
  },
  separator: {
    height: 1,
    marginTop: 12,
  },
})

export default PdfVariantItem
