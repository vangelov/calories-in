import { View } from '@react-pdf/renderer'
import { Food } from 'foods'
import { StatsTree } from 'stats'
import { VariantForm } from 'variants/variantForm'
import PdfVariantItem from './PdfVariantItem'

type Props = {
  variantsForms: VariantForm[]
  variantsFormsStatsTrees: StatsTree[]
  foodsById: Record<number, Food>
}

function PdfVariantsList({
  variantsForms,
  variantsFormsStatsTrees,
  foodsById,
}: Props) {
  return (
    <View>
      {variantsForms.map((variantForm, index) => {
        const { stats, subtrees } = variantsFormsStatsTrees[index]

        return (
          <PdfVariantItem
            style={{ marginTop: index > 0 ? 10 : 0 }}
            key={variantForm.fieldId}
            variantForm={variantForm}
            stats={stats}
            mealsFormsStatsTrees={subtrees}
            foodsById={foodsById}
          />
        )
      })}
    </View>
  )
}

export default PdfVariantsList
