import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { Food, FoodId } from 'foods'
import { IngredientForm } from 'ingredients'
import { Portion } from 'portions'
import { getAmountFromPortionToGrams } from 'portions/useGetAmount'
import { Stats } from 'stats'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'
import { getComputedColorFromChakra } from 'theme'

type Props = {
  ingredientForm: IngredientForm
  stats: Stats
  foodsById: Record<FoodId, Food>
  portionsById: Record<string, Portion>
}

const UNITS_WITH_DISTANCE = ['oz', 'tsp', 'tbsp', 'fl oz', 'c']

function getTest(
  portion: Portion,
  amount: string,
  portionsById: Record<string, Portion>,
  food: Food
) {
  const { gramsPerAmount, millilitersPerAmount } = portion

  const weightInGrams = Math.round(
    getAmountFromPortionToGrams(Number(amount), portion.id, food, portionsById)
  )

  if (gramsPerAmount) {
    const a = `${amount}${
      UNITS_WITH_DISTANCE.includes(portion.unit) ? ' ' : ''
    }${portion.unit}`

    if (gramsPerAmount !== 1) {
      return `${a} (${weightInGrams}g)`
    }

    return a
  }

  if (millilitersPerAmount) {
    return `${amount}${UNITS_WITH_DISTANCE.includes(portion.unit) ? ' ' : ''}${
      portion.unit
    } (${weightInGrams}g)`
  }

  return ''
}

function PdfIngredientItem({
  ingredientForm,
  stats,
  foodsById,
  portionsById,
}: Props) {
  const { portionId, foodId, amount } = ingredientForm
  const food = foodsById[foodId]
  const portion = portionsById[portionId]

  return (
    <View style={styles.root}>
      <PdfStatsLayout
        nameElement={
          <View style={{ marginLeft: 10 }}>
            <Text
              style={[
                styles.name,
                { color: getComputedColorFromChakra('gray.600') },
              ]}
            >
              {getTest(portion, amount, portionsById, food)} {food.name}
            </Text>

            {ingredientForm.notes ? (
              <Text
                style={[
                  styles.notes,
                  { color: getComputedColorFromChakra('gray.400') },
                ]}
              >
                {ingredientForm.notes}
              </Text>
            ) : null}
          </View>
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
