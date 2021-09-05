import { View } from '@react-pdf/renderer'
import { DietForm } from 'diets'
import { Food } from 'foods'
import { StatsTree } from 'stats'
import { VariantForm } from 'variants/variantForm'
import PdfVariantItem from './PdfVariantItem'

type Props = {
  dietForm: DietForm
  variantsForms: VariantForm[]
  variantsFormsStatsTrees: StatsTree[]
  foodsById: Record<number, Food>
}

function PdfVariantsList({
  dietForm,
  variantsForms,
  variantsFormsStatsTrees,
  foodsById,
}: Props) {
  const name = variantsForms.length === 1 ? dietForm.name : undefined

  return (
    <View>
      {variantsForms.map((variantForm, index) => {
        const { stats, subtrees } = variantsFormsStatsTrees[index]

        return (
          <PdfVariantItem
            style={{ marginTop: index > 0 ? 70 : 0 }}
            key={variantForm.fieldId}
            name={name}
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
