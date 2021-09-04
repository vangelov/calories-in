import ReactPDF, { Document, Page, Font, StyleSheet } from '@react-pdf/renderer'
import { Food } from 'foods'
import { PdfVariantsList } from 'variants'
import { DietForm } from './dietForm'
import getDietFormStatsTree from './getDietFormStatsTree'

type Props = {
  dietForm: DietForm
  foodsById: Record<number, Food>
} & ReactPDF.DocumentProps

function PdfDietEditor({ dietForm, foodsById, ...rest }: Props) {
  const { variantsForms } = dietForm
  const dietFormStatsTree = getDietFormStatsTree(dietForm, foodsById)

  return (
    <Document {...rest}>
      <Page style={styles.page}>
        <PdfVariantsList
          variantsForms={variantsForms}
          variantsFormsStatsTrees={dietFormStatsTree.subtrees}
          foodsById={foodsById}
        />
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Roboto',
  },
})

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src:
        'https://fontlibrary.org/assets/fonts/roboto/4f8c3c9bbdde908a86daabfe666d2f61/ac3f799d5bbaf5196fab15ab8de8431c/RobotoRegular.ttf',
      fontWeight: 'normal',
    },

    {
      src:
        'https://fontlibrary.org/assets/fonts/roboto/4f8c3c9bbdde908a86daabfe666d2f61/fe13e4170719c2fc586501e777bde143/RobotoMedium.ttf',
      fontWeight: 'medium',
    },

    {
      src:
        'https://fontlibrary.org/assets/fonts/roboto/4f8c3c9bbdde908a86daabfe666d2f61/d329cc8b34667f114a95422aaad1b063/RobotoBold.ttf',
      fontWeight: 'bold',
    },
  ],
})

export default PdfDietEditor
