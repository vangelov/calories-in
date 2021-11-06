import ReactPDF, {
  Document,
  Page,
  Font,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import { Food } from 'foods'
import { Portion } from 'portions'
import { StatsTree } from 'stats/calculations/getStatsTree'
import { getComputedColorFromChakra } from 'theme'
import PdfVariantsList from 'variants/PdfVariantsList'
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

  return (
    <Document {...rest}>
      <Page style={{ borderWidth: 0 }}>
        <View
          style={{
            alignItems: 'center',

            backgroundColor: getComputedColorFromChakra('teal.600'),
            padding: 12,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontFamily: 'Helvetica-Bold',
              color: 'white',
              fontSize: '18px',
            }}
          >
            Dimitar Chikakchiev
          </Text>
        </View>

        <View style={styles.page}>
          <PdfVariantsList
            dietForm={dietForm}
            variantsForms={variantsForms}
            variantsFormsStatsTrees={dietFormStatsTree.subtrees}
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
    padding: 12,
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
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
