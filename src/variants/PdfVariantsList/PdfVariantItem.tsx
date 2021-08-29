import { Text, StyleSheet, View } from '@react-pdf/renderer'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'
import { Style } from '@react-pdf/types/style'
import PdfMealsList from 'meals/PdfMealsList'
import { VariantForm } from 'variants/variantForm'

type Props = {
  variantForm: VariantForm
  style?: Style
}

function PdfVariantItem({ variantForm, style = {} }: Props) {
  const { mealsForms } = variantForm

  return (
    <View style={[style]}>
      <PdfStatsLayout
        nameElement={<Text style={styles.name}>Variant Name</Text>}
        energyElement={<PdfStat label="Energy" value={100} />}
        proteinElement={<PdfStat label="Protein" value={100} />}
        carbsElement={<PdfStat label="Carbs" value={100} />}
        fatElement={<PdfStat label="Fat" value={100} />}
      />

      <PdfMealsList mealsForms={mealsForms} />
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
  },
})

export default PdfVariantItem
