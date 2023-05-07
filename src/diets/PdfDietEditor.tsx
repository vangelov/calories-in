import ReactPDF, {
  Document,
  Page,
  Font,
  StyleSheet,
  View,
} from '@react-pdf/renderer'
import { Food } from 'foods'
import { Portion } from 'portions'
import { ReactElement } from 'react'
import { StatsTree } from 'stats/calculations/getStatsTree'
import getComputedColorFromChakra from 'theme/getComputedColorFromChakra'
import PdfVariantItem from 'variants/PdfVariantsList/PdfVariantItem'
import { DietForm } from './dietForm'

type Props = {
  dietForm: DietForm
  foodsById: Record<number, Food>
  portionsById: Record<string, Portion>

  dietFormStatsTree: StatsTree
} & ReactPDF.DocumentProps

function PdfDietEditor({
  dietForm,
  foodsById,
  portionsById,
  dietFormStatsTree,
  ...rest
}: Props) {
  const { variantsForms } = dietForm

  const variantItemsElements: ReactElement[] = []

  variantsForms.forEach((variantForm, index) => {
    const { mealsForms } = variantForm
    const { stats, subtrees } = dietFormStatsTree.subtrees[index]

    if (mealsForms.length > 0) {
      variantItemsElements.push(
        <PdfVariantItem
          index={variantItemsElements.length}
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

  return (
    <Document {...rest}>
      <Page
        style={[
          styles.page,
          { backgroundColor: getComputedColorFromChakra('gray.50') },
        ]}
      >
        <View
          fixed
          style={{
            backgroundColor: getComputedColorFromChakra('teal.500'),
            height: 10,
            alignItems: 'center',
            padding: 4,
            marginBottom: 24,
          }}
        />

        {variantItemsElements}
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    paddingBottom: 12,
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
