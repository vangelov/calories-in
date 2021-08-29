import { View } from '@react-pdf/renderer'
import { VariantForm } from 'variants/variantForm'
import PdfVariantItem from './PdfVariantItem'

type Props = {
  variantsForms: VariantForm[]
}

function PdfVariantsList({ variantsForms }: Props) {
  return (
    <View>
      {variantsForms.map((variantForm, index) => (
        <PdfVariantItem
          style={{ marginTop: index > 0 ? 10 : 0 }}
          key={variantForm.fieldId}
          variantForm={variantForm}
        />
      ))}
    </View>
  )
}

export default PdfVariantsList
