import ReactPDF, {
  Document,
  Page,
  Font,
  StyleSheet,
  Text,
  View,
  Link,
} from '@react-pdf/renderer'
import { Food } from 'foods'
import { getComputedColorFromChakra } from 'theme'
import PdfVariantsList from 'variants/PdfVariantsList'
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
        {variantsForms.length > 1 && (
          <Text
            style={[
              styles.title,
              {
                color: getComputedColorFromChakra(
                  dietForm.name ? 'gray.600' : 'gray.400'
                ),
              },
            ]}
          >
            {dietForm.name || 'Untitled meal plan'}
          </Text>
        )}
        <PdfVariantsList
          dietForm={dietForm}
          variantsForms={variantsForms}
          variantsFormsStatsTrees={dietFormStatsTree.subtrees}
          foodsById={foodsById}
        />

        <View
          fixed
          style={{
            marginTop: 16,

            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: getComputedColorFromChakra('gray.800'),
            }}
          >
            Created using:{' '}
            <Link
              style={{ color: getComputedColorFromChakra('teal.500') }}
              src="http://caorories-in.com"
            >
              http://calories-in.com
            </Link>
          </Text>
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
