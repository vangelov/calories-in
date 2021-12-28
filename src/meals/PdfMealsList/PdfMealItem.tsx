import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { MealForm } from 'meals'
import { Style } from '@react-pdf/types/style'
import getComputedColorFromChakra from 'theme/getComputedColorFromChakra'
import { Stats } from 'stats'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'
import { Food } from 'foods'
import PdfIngredientsList from 'ingredients/PdfIngredientsList'
import { Portion } from 'portions'
import Notes from './Notes'

type Props = {
  mealForm: MealForm
  style?: Style
  stats: Stats
  ingredientsFormsStats: Stats[]
  foodsById: Record<number, Food>
  portionsById: Record<string, Portion>
}

function PdfMealItem({
  mealForm,
  stats,
  ingredientsFormsStats,
  style = {},
  foodsById,
  portionsById,
}: Props) {
  const { ingredientsForms } = mealForm

  return (
    <View
      wrap={false}
      style={[
        styles.root,
        style,
        { borderColor: getComputedColorFromChakra('gray.200') },
      ]}
    >
      <View style={[styles.header]}>
        <PdfStatsLayout
          nameElement={
            <Text
              style={[
                styles.name,
                {
                  color: getComputedColorFromChakra(
                    mealForm.name ? 'gray.600' : 'gray.500'
                  ),
                },
              ]}
            >
              {mealForm.name || 'Untitled meal'}
            </Text>
          }
          energyElement={
            <PdfStat
              variant="mealEnergy"
              label="Calories"
              value={stats.energy}
            />
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

      <View
        style={{ paddingLeft: 10, paddingRight: 10, backgroundColor: 'white' }}
      >
        <View
          style={{
            backgroundColor: getComputedColorFromChakra('gray.100'),
            height: '1px',
          }}
        />
      </View>
      <PdfIngredientsList
        ingredientsForms={ingredientsForms}
        ingredientsFormsStats={ingredientsFormsStats}
        foodsById={foodsById}
        portionsById={portionsById}
      />

      {mealForm.notes && <Notes notes={mealForm.notes} />}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderRadius: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'medium',
    marginLeft: 12,
  },
  header: {
    backgroundColor: 'white',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    paddingTop: 12,
    paddingBottom: 12,
  },
})

export default PdfMealItem
