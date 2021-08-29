import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { IngredientForm } from 'ingredients/ingredientForm'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'

type Props = {
  ingredientForm: IngredientForm
}

function PdfIngredientItem({ ingredientForm }: Props) {
  return (
    <View style={styles.root}>
      <PdfStatsLayout
        nameElement={<Text style={styles.name}>ТестЖ</Text>}
        amountElement={<PdfStat value={Number(ingredientForm.amountInGrams)} />}
        energyElement={<PdfStat value={100} />}
        proteinElement={<PdfStat value={100} />}
        carbsElement={<PdfStat value={100} />}
        fatElement={<PdfStat value={100} />}
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
