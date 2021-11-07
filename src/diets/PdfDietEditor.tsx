import ReactPDF, {
  Document,
  Page,
  Font,
  StyleSheet,
  View,
} from '@react-pdf/renderer'
import { Food } from 'foods'
import { Portion } from 'portions'
import { StatsTree } from 'stats/calculations/getStatsTree'
import { getComputedColorFromChakra } from 'theme'
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
  const { variantsForms, selectedVariantFormIndex } = dietForm
  const variantForm = variantsForms[selectedVariantFormIndex]
  const { stats, subtrees } = dietFormStatsTree.subtrees[
    selectedVariantFormIndex
  ]

  return (
    <Document {...rest}>
      <Page style={styles.page}>
        <View
          style={{
            backgroundColor: getComputedColorFromChakra('teal.500'),
            height: '8px',
          }}
        />

        <View style={styles.content}>
          <PdfVariantItem
            index={0}
            variantForm={variantForm}
            stats={stats}
            mealsFormsStatsTrees={subtrees}
            foodsById={foodsById}
            portionsById={portionsById}
          />
        </View>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
  },
  content: {
    padding: 12,
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
