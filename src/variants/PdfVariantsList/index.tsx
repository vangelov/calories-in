import { Food } from 'foods'
import { Portion } from 'portions'
import { ReactElement } from 'react'
import { StatsTree } from 'stats'
import { VariantForm } from 'variants/variantForm'
import PdfVariantItem from './PdfVariantItem'

type Props = {
  variantsForms: VariantForm[]
  variantsFormsStatsTrees: StatsTree[]
  foodsById: Record<number, Food>
  portionsById: Record<string, Portion>
}

function PdfVariantsList({
  variantsForms,
  variantsFormsStatsTrees,
  foodsById,
  portionsById,
}: Props) {
  const variantItemsElements: ReactElement[] = []

  variantsForms.forEach((variantForm, index) => {
    const { mealsForms } = variantForm
    const { stats, subtrees } = variantsFormsStatsTrees[index]

    if (mealsForms.length > 0) {
      variantItemsElements.push(
        <PdfVariantItem
          index={index}
          key={variantForm.fieldId}
          variantForm={variantForm}
          stats={stats}
          mealsFormsStatsTrees={subtrees}
          foodsById={foodsById}
          portionsById={portionsById}
        />
      )
    }
  })

  return variantItemsElements
}

export default PdfVariantsList
