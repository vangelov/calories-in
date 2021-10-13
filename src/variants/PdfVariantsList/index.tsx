import { View } from '@react-pdf/renderer'
import { DietForm } from 'diets'
import { Food } from 'foods'
import { ReactElement } from 'react'
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
  const variantItemsElements: ReactElement[] = []

  variantsForms.forEach((variantForm, index) => {
    const { mealsForms } = variantForm
    const { stats, subtrees } = variantsFormsStatsTrees[index]

    if (mealsForms.length > 0) {
      variantItemsElements.push(
        <PdfVariantItem
          index={index}
          key={variantForm.fieldId}
          name={name}
          variantForm={variantForm}
          stats={stats}
          mealsFormsStatsTrees={subtrees}
          foodsById={foodsById}
        />
      )
    }
  })

  return <View>{variantItemsElements}</View>
}

export default PdfVariantsList
