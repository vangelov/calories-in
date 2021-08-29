import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { IngredientForm } from 'ingredients/ingredientForm'
import PdfIngredientsList from 'ingredients/PdfIngredientsList'
import { MealForm } from 'meals/mealForm'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'
import { Style } from '@react-pdf/types/style'

type Props = {
  mealForm: MealForm
  style?: Style
}

function PdfMealItem({ mealForm, style = {} }: Props) {
  const { ingredientsForms } = mealForm

  return (
    <View style={[styles.root, style]}>
      <View style={styles.header}>
        <PdfStatsLayout
          nameElement={<Text style={styles.name}>Meal name</Text>}
          amountElement={<PdfStat label="Amount" value={100} />}
          energyElement={<PdfStat label="Energy" value={100} />}
          proteinElement={<PdfStat label="Protein" value={100} />}
          carbsElement={<PdfStat label="Carbs" value={100} />}
          fatElement={<PdfStat label="Fat" value={100} />}
        />
      </View>
      <PdfIngredientsList ingredientsForms={ingredientsForms} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  name: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'medium',
  },
  header: {
    backgroundColor: 'lightgray',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    paddingTop: 10,
    paddingBottom: 10,
  },
})

export default PdfMealItem
