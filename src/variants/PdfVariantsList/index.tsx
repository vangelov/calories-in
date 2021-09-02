import { View } from '@react-pdf/renderer'
import { StatsTree } from 'stats'
import { VariantForm } from 'variants/variantForm'
import PdfVariantItem from './PdfVariantItem'

type Props = {
  variantsForms: VariantForm[]
  variantsFormsStatsTrees: StatsTree[]
}

function PdfVariantsList({ variantsForms, variantsFormsStatsTrees }: Props) {
  return (
    <View>
      {variantsForms.map((variantForm, index) => {
        const { sum, parts } = variantsFormsStatsTrees[index]

        return (
          <PdfVariantItem
            style={{ marginTop: index > 0 ? 10 : 0 }}
            key={variantForm.fieldId}
            variantForm={variantForm}
            stats={sum}
            mealsFormsStatsTrees={parts as StatsTree[]}
          />
        )
      })}
    </View>
  )
}

export default PdfVariantsList
